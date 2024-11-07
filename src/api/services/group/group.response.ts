type TMember = {
  email: string;
  name: string;
  status: number;
  _id: string;
};
export type IGroup = {
  groupName: string;
  members: TMember[];
  owner: TMember;
  createdAt: Date;
  updatedAt: Date;
  status: number; //0: deactive ; 1: active
  exams?: string[];
  prompts?: string[];
  _id: string;
};
