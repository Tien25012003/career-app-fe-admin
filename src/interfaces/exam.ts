import { EExamCategory, EExamStatus, EQuestionType } from '@enum/exam';

export type TExam = 'R' | 'I' | 'A' | 'S' | 'E' | 'C' | 'IQ' | 'EQ' | 'SchoolScore';
export interface IOption {
  id?: string;
  image?: string | null;
  content: string;
  isResult?: boolean;
  standardScore?: number;
}
export interface IQuestion {
  id?: string;
  questionType?: EQuestionType;
  questionTitle: string;
  image?: string;
  options: IOption[];
  //answer?: number | number[];
}
export interface IResult {
  id?: string;
  score?: null | number[];
  content: string;
  image?: string;
  detail?: string;
}
export interface IExam {
  type: TExam;
  questions: IQuestion[];
  results: IResult[];

  // new response
  // new type => TO DO // ADD IN MOBILE SIDE

  name?: string;
  category: EExamCategory;
  createdAt?: number;
  creator?: string;
  updatedAt?: number;
  updator?: string;
  status?: EExamStatus;
}
