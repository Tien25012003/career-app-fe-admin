import { EGroup } from '@enum/exam';

export type MajorREQ = {
  name: string;
  image: string;
  imageKey?: string;
  subjects: string;
  pros: string;
  cons: string;
  group: EGroup;
  page?: number;
  size?: number;
};

export type AddMajorREQ = {
  name: string;
  image: string | null;
  imageKey?: string | null;
  subjects: string;
  pros: string;
  cons: string;
  groupId: string;
};
