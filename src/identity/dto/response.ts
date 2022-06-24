import { BVN } from '../values/bvn';
import { NIN } from '../values/nin';
import { NUBAN } from '../values/nuban';

export interface Response {
  firstName: string;
  middleName: string;
  lastName: string;
  aliases: string[];
  dateOfBirth: string;
  address: string;
  gender: string;
  photo_id: string;
  phones: string[];
  emails: string[];
  fullName: string;
  bvn: BVN;
  customer: string;
  identity: string;
  nin: NIN;
  lgaOrigin: string;
  lgaResidence: string;
  nationality: string;
  stateResidence: string;
  stateOrigin: string;
  enrollment: Enrollment;
  watchlist: boolean;
  maritalStatus: string;
  accountLevel: string;
  verificationCountry: string;
  bankAccounts: BankAccount[];
}

type BankAccount = {
  nuban: NUBAN;
  bank: string;
  registrationDate: string;
  verificationDate?: string;
};

export interface Enrollment {
  bank: string;
  registrationDate: string;
}
