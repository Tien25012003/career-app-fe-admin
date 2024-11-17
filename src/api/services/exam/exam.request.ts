import { EExamCategory, EExamStatus } from '@enum/exam';
import { IQuestion, IResult, TExam } from '@interface/exam';

export type ExamREQ = {
  category?: EExamCategory;
  name?: string;
  type?: TExam;
  creator?: string;
  updator?: string;
  status?: EExamStatus | null;

  // For group
  groupId?: string;

  // For filter
  id?: string;
  startDate?: number;
  endDate?: number;
};

export type AddExamREQ = {
  name: string;
  type: TExam | null;
  questions: IQuestion[];
  results: IResult[];
  category: EExamCategory;
  status?: EExamStatus;
};

export type EditExamREQ = {
  name: string;
  type: TExam | null;
  questions: IQuestion[];
  results: IResult[];
};

export type TExamToGroupREQ = {
  groupId: string;
  examId: string;
};
