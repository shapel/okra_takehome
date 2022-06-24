import { Injectable } from '@nestjs/common';
import { fetch } from 'undici';
import { ConfirmBVNDto } from './dto/confirm-bvn.dto';
import { ProcessIdentityDto } from './dto/process-identity.dto';
import { AccountsByBVNDto } from './dto/accounts-by-bvn.dto';
import { BVN } from './values/bvn';
import { NUBAN } from './values/nuban';
import { ConfirmNUBANDto } from './dto/confirm-nuban.dto';

@Injectable()
export class VerificationService {
  async accountsByBVN(payload: ProcessIdentityDto): Promise<AccountsByBVNDto> {
    return this.post(
      'https://api.okra.ng/v2/mock-api/accounts-by-bvn',
      payload,
    );
  }

  async confirmNUBAN(payload: {
    nuban: NUBAN;
    bank: string;
    bvn: BVN;
  }): Promise<ConfirmNUBANDto> {
    return this.post('https://api.okra.ng/v2/mock-api/confirm-nuban', payload);
  }

  async confirmBVN(payload: { bvn: BVN; dob: string }): Promise<ConfirmBVNDto> {
    return this.post('https://api.okra.ng/v2/mock-api/confirm-bvn', payload);
  }

  private async post<T>(url: string, body: object): Promise<T> {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json() as Promise<T>;
  }
}
