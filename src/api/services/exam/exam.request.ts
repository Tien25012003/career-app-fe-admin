import { EExamCategory, EExamStatus } from '@enum/exam';
import { IQuestion, IResult, TExam } from '@interface/exam';

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

export type AddExamREQ = {
  name: string;
  type: TExam | null;
  questions: IQuestion[];
  results: IResult[];
  category: EExamCategory;
  status?: EExamStatus;
};
