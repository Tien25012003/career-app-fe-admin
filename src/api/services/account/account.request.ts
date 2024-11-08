import { TPermission } from './account.response';

export type GetListAccountREQ = {
  status: number;
  email: string;
  name: string;
  page: number;
  size: number;
  role: string;
};
export type TAccountREQ = {
  _id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  groups: string[];
  createdAt: Date;
  updatedAt: Date;
  accessToken?: string;
  password: string;
  status: number; //0: deactive ; 1: active
  permissions?: TPermission[];
  deviceId: string;
};

export type TAccountName = {
  _id: string;
  name: string;
  email: string;
};
