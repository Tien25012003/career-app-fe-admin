export type TExam = 'R' | 'I' | 'A' | 'S' | 'E' | 'C' | 'IQ' | 'EQ' | 'SchoolScore';
export enum EQuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TICK_BOX = 'TICK_BOX',
  SHORT_ANSWER = 'SHORT_ANSWER',
  COMBINE = 'COMBINE',
  //SCHOOL_SCORE = 'SCHOOL_SCORE', // Special Type
}
export enum EExamStatus {
  UNACTIVATED = 'UNACTIVATED',
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
}
export enum EExamCategory {
  SYSTEM = 'SYSTEM',
  DESIGN = 'DESIGN',
}
export interface IOption {
  id?: string;
  image?: string;
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
  createAt?: number;
  creator?: string;
  updateAt?: number;
  updator?: string;
  status?: EExamStatus;
}
