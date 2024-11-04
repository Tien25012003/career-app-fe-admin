export type IGroup = {
  groupName: string;
  members: string[];
  owner: string;
  createdAt: Date;
  updatedAt: Date;
  status: number; //0: deactive ; 1: active
  exams?: string[];
  prompts?: string[];
  _id: string;
};
