import {
  Injectable,
  Logger,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { ProcessIdentityDto } from './dto/process-identity.dto';
import { toBVN } from './values/bvn';
import { toNUBAN } from './values/nuban';
import { ConfirmNUBANDtoSuccess } from './dto/confirm-nuban.dto';
import { formatDateToYMD, parseDate } from '../common/utils/date';
import { VerificationService } from './verification.service';
import { toNIN } from './values/nin';
import { Identity } from './interfaces/identity.interface';
import { Model } from 'mongoose';
import { IdentityDocument } from './schemas/identity.schema';
import { IDENTITY_MODEL } from './constants';

@Injectable()
export class IdentityService {
  private readonly logger = new Logger(IdentityService.name);

  constructor(
    @Inject(IDENTITY_MODEL)
    private identityModel: Model<IdentityDocument>,
    private readonly verificationService: VerificationService,
  ) {}

  async verifyIdentity(payload: ProcessIdentityDto): Promise<Identity> {
    const storedIdentity = await this.identityModel.findOne({
      bvn: payload.bvn,
    });
    // TODO: deal with incomplete identity
    if (storedIdentity) {
      return storedIdentity;
    }

    const accounts = await this.verificationService.accountsByBVN(payload);
    if (accounts.status === 'error') {
      throw new BadRequestException(accounts.message);
    }
    const identity: Omit<Identity, 'id'> = {
      bvn: payload.bvn,
      bankAccounts: accounts.data.response.map((x) => ({
        nuban: toNUBAN(x.account_no),
        bank: x.bank,
      })),
      emails: [],
      phones: [],
      birthDate: undefined,
      fullName: '',
      firstName: '',
      lastName: '',
      middleName: '',
      addresses: [],
      nin: undefined,
      lgaOrigin: '',
      lgaResidence: '',
      nationality: '',
      stateResidence: '',
      stateOrigin: '',
      enrollment: undefined,
      onWatchlist: false,
      maritalStatus: '',
      accountLevel: '',
      verificationCountry: '',
      gender: '',
      photos: [],
    };

    const confirmedNUBAN = (
      await Promise.allSettled(
        accounts.data.response.map(async (account) => {
          return this.verificationService.confirmNUBAN({
            nuban: toNUBAN(account.account_no),
            bank: account.bank,
            bvn: payload.bvn,
          });
        }),
      )
    ).reduce((acc, promise) => {
      if (promise.status === 'fulfilled') {
        if (promise.value.status === 'success') {
          acc.push(promise.value);
        } else {
          this.logger.error(promise.value.message);
        }
      } else {
        // TODO: better handle errors
        this.logger.error(promise.reason);
      }
      return acc;
    }, [] as ConfirmNUBANDtoSuccess[]);

    confirmedNUBAN.forEach((x) => {
      // mark bank accounts as verified
      const bankAccount = identity.bankAccounts.find(
        (account) => account.nuban === toNUBAN(x.data.response.account_number),
      );
      if (bankAccount) {
        bankAccount.verifiedAt = new Date();
      }
      enrich(identity, 'birthDate', parseDate(x.data.response.birthdate));
      enrich(identity, 'fullName', x.data.response.full_name);
      enrich(identity, 'emails', [x.data.response.Email]);
      enrich(identity, 'phones', [x.data.response.phone_number]);
    });

    const confirmBVN = await this.verificationService.confirmBVN({
      bvn: identity.bvn,
      dob: formatDateToYMD(identity.birthDate),
    });

    if (confirmBVN.status === 'success') {
      const { response } = confirmBVN.data;
      enrich(identity, 'firstName', response.FirstName);
      enrich(identity, 'lastName', response.LastName);
      enrich(identity, 'middleName', response.MiddleName);
      enrich(identity, 'birthDate', parseDate(response.DateOfBirth));
      enrich(identity, 'addresses', [response.Address]);
      enrich(identity, 'gender', response.Gender);
      enrich(identity, 'photos', [response.PhotoId]);

      enrich(identity, 'enrollment', {
        bank: response.Enrollment_Bank,
        registrationDate: parseDate(response.Enrollment_Date),
      });
      enrich(identity, 'enrollment', {
        bank: response.Enrollment_Bank,
        registrationDate: parseDate(response.Enrollment_Date),
      });
      enrich(identity, 'phones', [response.Phone]);
      enrich(identity, 'emails', [response.Email]);
      enrich(identity, 'fullName', response.FullName);
      enrich(identity, 'bvn', toBVN(response.Bvn));
      enrich(identity, 'nin', toNIN(response.Nin));
      enrich(identity, 'lgaOrigin', response.LGAOrigin);
      enrich(identity, 'lgaResidence', response.LGAOfResidence);
      enrich(identity, 'nationality', response.nationality);
      enrich(identity, 'stateResidence', response.State_of_residence);
      enrich(identity, 'stateOrigin', response.State_of_origin);
      enrich(identity, 'onWatchlist', !!response.Watchlist);
      enrich(identity, 'maritalStatus', response.MaritalStatus);
      enrich(identity, 'accountLevel', response.AccountLevel);
      enrich(identity, 'verificationCountry', response.VerificationCountry);
    } else {
      // TODO: deal with incomplete identity
      throw new BadRequestException(accounts.message);
    }
    return await this.identityModel.create(identity);
  }
}

const enrich = <T, K extends keyof T>(identity: T, key: K, value: T[K]): T => {
  const props = identity[key];
  if (Array.isArray(props) && Array.isArray(value)) {
    const set = new Set([...props, ...value]);
    // TODO: use comparator function
    identity[key as string] = [...set];
  } else {
    identity[key as string] = identity[key] || value;
  }
  return identity;
};
