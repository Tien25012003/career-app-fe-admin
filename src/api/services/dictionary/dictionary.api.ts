import { api } from '@api/config';
import { BaseResponse, TPagingResponse } from '@type/response.type';
import { AddMajorREQ, MajorREQ } from './dictionary.request';
import { GroupRESP, MajorRESP } from './dictionary.response';

const BASE_URL = '/dictionary';

export const getMajorsAPI = (data: MajorREQ): Promise<TPagingResponse<MajorRESP[]>> => api.get(`${BASE_URL}/major`, { params: data });

export const addMajorAPI = (data: AddMajorREQ): Promise<BaseResponse<void>> => api.post(`${BASE_URL}/major`, data);

export const getMajorGroupsAPI = (): Promise<BaseResponse<GroupRESP[]>> => api.get(`${BASE_URL}/groups`);

export const deleteMajorAPI = (id: string, groupId: string): Promise<BaseResponse<void>> =>
  api.put(`${BASE_URL}/deleteMajor`, undefined, { params: { id, groupId } });
