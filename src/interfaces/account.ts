import { EROLE } from '@enum/account.enum';

export interface IAccount {
  name: string;
  email: string;
  username: string;
  role: EROLE;

  // TODO: Permission
}
