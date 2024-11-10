import { EGroup } from '@enum/exam';

export type MajorREQ = {
  name: string;
  image: string;
  subjects: string;
  pros: string;
  cons: string;
  group: EGroup;
  page?: number;
  size?: number;
};
