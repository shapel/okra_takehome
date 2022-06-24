import { Identity } from '../../identity/interfaces/identity.interface';
import { User } from '../../users/interfaces/user.interface';

export interface Customer {
  id: string;
  identity: Identity;
  createdBy: User;
  createdDate: Date;
}
