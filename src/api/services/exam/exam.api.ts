import { api } from '@api/config';
import { TPagingResponse } from '@type/response.type';
import { ExamREQ } from './exam.request';
import { ExamRESP } from './exam.response';

const BASE_URL = '/exams';

export const getExamListAPI = (data: ExamREQ): Promise<TPagingResponse<ExamRESP[]>> => api.get(`${BASE_URL}/examList`, { params: data });
