import { EROLE } from '@enum/account.enum';

export type UserInfoRES = {
  id: string;
  username: string;
  email: string;
  role: EROLE;
  // TODO: GROUP & PERMISSION
};

export type LoginRESP = UserInfoRES & {
  accessToken: string;
};
