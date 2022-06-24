import { BVN } from '../values/bvn';
import { NIN } from '../values/nin';
import { NUBAN } from '../values/nuban';

export interface Identity {
  bvn: BVN;
  birthDate: Date;
  fullName: string;
  firstName: string;
  lastName: string;
  middleName: string;
  emails: string[];
  addresses: string[];
  phones: string[];
  bankAccounts: BankAccount[];
  nin: NIN;
  lgaOrigin: string;
  lgaResidence: string;
  nationality: string;
  stateResidence: string;
  stateOrigin: string;
  enrollment: Enrollment;
  onWatchlist: boolean;
  maritalStatus: string;
  accountLevel: string;
  verificationCountry: string;
  gender: string;
  photos: string[];
}

export interface BankAccount {
  nuban: NUBAN;
  bank: string;
  verifiedAt?: Date;
}

export interface Enrollment {
  bank: string;
  registrationDate: Date;
}
