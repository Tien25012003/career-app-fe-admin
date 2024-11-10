import { api } from '@api/config';
import { BaseResponse, TPagingResponse } from '@type/response.type';
import { AddConclusionREQ, ConclusionREQ } from './conclusion.request';
import { ConclusionRESP } from './conclusion.response';

const BASE_URL = '/exams';

export const getListConclusionAPI = (data: ConclusionREQ): Promise<TPagingResponse<ConclusionRESP[]>> =>
  api.get(`${BASE_URL}/getListConclusion`, { params: data });

export const addConclusionAPI = (data: AddConclusionREQ): Promise<TPagingResponse<ConclusionRESP[]>> => api.post(`${BASE_URL}/conclusion`, data);

export const deleteConclusionAPI = (id: string): Promise<BaseResponse<void>> => api.delete(`${BASE_URL}/conclusion`, { params: { id } });

export const editConclusionAPI = (id: string, data: AddConclusionREQ): Promise<TPagingResponse<ConclusionRESP[]>> =>
  api.put(`${BASE_URL}/conclusion`, data, { params: { id } });
