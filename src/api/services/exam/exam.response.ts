import { EExamCategory, EExamStatus, EQuestionType } from '@enum/exam';
import { TExam } from '@interface/exam';

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
  questions: QuestionRESP[];
  results: ResultRESP[];
};

export type QuestionRESP = {
  _id?: string;
  questionType?: EQuestionType;
  questionTitle: string;
  image?: string | null;
  options: OptionRESP[];
  imageKey?: string | null;
};

export type OptionRESP = {
  _id?: string;
  image?: string | null;
  content: string;
  isResult?: boolean;
  standardScore?: number;
  imageKey?: string | null;
};

export type ResultRESP = {
  _id?: string;
  score?: number[] | null;
  content: string;
  image?: string | null;
  detail?: string;

  // new response
  imageKey?: string | null;
};
export type TExamSelectRESP = {
  _id: string;
  type: string;
  name: string;
  category: string;
};
