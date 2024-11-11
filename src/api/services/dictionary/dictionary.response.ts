import { EGroup } from '@enum/exam';

export type MajorRESP = {
  _id: string;
  name: string;
  image: string;
  subjects: string;
  pros: string;
  cons: string;
  groupId: string;
};

export type GroupRESP = {
  _id: string;
  group: EGroup;
};
