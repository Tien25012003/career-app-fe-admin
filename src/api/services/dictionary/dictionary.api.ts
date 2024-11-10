import { api } from '@api/config';
import { TPagingResponse } from '@type/response.type';
import { MajorREQ } from './dictionary.request';
import { MajorRESP } from './dictionary.response';

const BASE_URL = '/dictionary';

export const getMajorsAPI = (data: MajorREQ): Promise<TPagingResponse<MajorRESP[]>> => api.get(`${BASE_URL}/major`, { params: data });
