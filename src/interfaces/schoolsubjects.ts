import { ITracking } from './meta';

export interface ISubject extends ITracking {
  _id: string;
  name: string;
  vnName: string;
}
export interface ICaculateSubject extends ISubject {
  value: string;
}
export interface ISubjects {
  subjects: ISubject[];
}
