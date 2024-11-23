import { EROLE } from '@enum/account.enum';

export type UserInfoRES = {
  _id: string;
  username: string;
  email: string;
  role: EROLE;
  name: string;
  // TODO: GROUP & PERMISSION
  permissions: TPermission[];
};
export enum EFeature {
  DASHBOARD = 'DASHBOARD',
  ACCOUNT = 'ACCOUNT',
  EXAM_SYSTEM = 'EXAM_SYSTEM',
  EXAM_CUSTOM = 'EXAM_CUSTOM',
  NEWS = 'NEWS',
  CHATBOT = 'CHATBOT',
  LIBRARY = 'LIBRARY',
}
export type TFeatureDetail = {
  create: boolean;
  edit: boolean;
  delete: boolean;
  view: boolean;
};

export type TPermission = {
  code: string;
  name: string;
  permission: TFeatureDetail;
};
export type LoginRESP = UserInfoRES & {
  accessToken: string;
};
