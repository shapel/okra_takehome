import { Injectable } from '@nestjs/common';
import { ProcessIdentityDto } from './dto/process-identity.dto';
import { fetch } from 'undici';
import { AccountsByBVNDto } from './dto/accounts-by-bvn.dto';
import { BVN } from './values/bvn';
import { NUBAN } from './values/nuban';
import { ConfirmNUBANDto } from './dto/confirm-nuban.dto';
import { ConfirmBVNDto } from './dto/confirm-bvn.dto';

const post = async <T>(url: string, body: object): Promise<T> => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json() as Promise<T>;
};

@Injectable()
export class IdentityService {
  async process(payload: ProcessIdentityDto) {
    throw new Error('Method not implemented.');
  }

  private async accountsByBVN(
    payload: ProcessIdentityDto,
  ): Promise<AccountsByBVNDto> {
    return post('https://api.okra.ng/v2/mock-api/accounts-by-bvn', payload);
  }

  private async confirmNUBAN(payload: {
    nuban: NUBAN;
    bank: string;
    bvn: BVN;
  }): Promise<ConfirmNUBANDto> {
    return post('https://api.okra.ng/v2/mock-api/confirm-nuban', payload);
  }

  private async confirmBVN(payload: {
    bvn: BVN;
    dob: 'string';
  }): Promise<ConfirmBVNDto> {
    return post('https://api.okra.ng/v2/mock-api/confirm-bvn', payload);
  }
}
