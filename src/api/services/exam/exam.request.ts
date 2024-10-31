import { EExamCategory, EExamStatus } from '@enum/exam';
import { TExam } from '@interface/exam';

export type ExamREQ = {
  category?: EExamCategory;
  name?: string;
  type?: TExam;
  creator?: string;
  updator?: string;
  status?: EExamStatus;

  // For group
  groupId?: number;
};
