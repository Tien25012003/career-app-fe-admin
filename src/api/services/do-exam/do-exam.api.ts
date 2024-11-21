import { api } from '@api/config';
import { TPagingResponse } from '@type/response.type';
import { DoExamREQ } from './do-exam.request';
import { DoExamRESP } from './do-exam.response';

const BASE_URL = '/do-exam';

export const getDoExamListAPI = (data: DoExamREQ): Promise<TPagingResponse<DoExamRESP[]>> => api.get(BASE_URL, { params: data });
