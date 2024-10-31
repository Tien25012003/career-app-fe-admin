import { api } from '@api/config';
import { BaseResponse, TPagingResponse } from '@type/response.type';
import { SubjectREQ } from './subject.request';
import { SubjectRESP } from './subject.response';

const BASE_URL = '/schoolSubjects';

export const getSchoolSubjectsAPI = (data: SubjectREQ): Promise<TPagingResponse<SubjectRESP[]>> =>
  api.get(`${BASE_URL}/getSubjects`, { params: data });

export const addSubjectAPI = (data: SubjectREQ[]): Promise<BaseResponse<void>> => api.post(`${BASE_URL}/addSubjects`, { subjects: data });

export const deleteSubjectAPI = (id: string): Promise<BaseResponse<void>> => api.delete(`${BASE_URL}/deleteSubjects`, { params: { id } });
