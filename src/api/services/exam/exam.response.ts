import { EExamCategory, EExamStatus } from '@enum/exam';
import { IQuestion, IResult, TExam } from '@interface/exam';

export type ExamRESP = {
  _id: string;
  type: TExam;
  name?: string;
  category: EExamCategory;
  createdAt?: number;
  creator?: string;
  updatedAt?: number;
  updator?: string;
  status?: EExamStatus;
};

export type ExamDetailRESP = ExamRESP & {
  questions: IQuestion[];
  results: IResult[];
};
