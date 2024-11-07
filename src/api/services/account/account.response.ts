import { EExamCategory, EExamStatus } from '@enum/exam';
import { IQuestion, IResult, TExam } from '@interface/exam';
enum EFeature {
  DASHBOARD = 'DASHBOARD',
  ACCOUNT = 'ACCOUNT',
  EXAM_SYSTEM = 'EXAM_SYSTEM',
  EXAM_CUSTOM = 'EXAM_CUSTOM',
  NEWS = 'NEWS',
  CHATBOT = 'CHATBOT',
  LIBRARY = 'LIBRARY',
}
type TFeatureDetail = {
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

export type TACCOUNT = {
  _id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  groups: { _id: string; groupName: string }[];
  createdAt: Date;
  updatedAt: Date;
  accessToken?: string;
  password: string;
  status: number; //0: deactive ; 1: active
  permissions?: TPermission[];
  deviceId: string;
};
