import { api } from '@api/config';
import { TPagingResponse } from '@type/response.type';
import { GroupREQ, TGroupREQ } from './group.request';
import { IGroup } from './group.response';

const BASE_URL = '/groups';

export const getGroupListAPI = (data: Partial<GroupREQ>): Promise<TPagingResponse<IGroup[]>> => api.get(`${BASE_URL}/all`, { params: data });
export const getGroupSelectAPI = (): Promise<TPagingResponse<Pick<IGroup, '_id' | 'groupName'>[]>> => api.get(`${BASE_URL}/select`);
export const createGroupAPI = (data: TGroupREQ) => api.post(`${BASE_URL}`, data);
export const getGroupAPI = (params: { id: string }): Promise<TPagingResponse<IGroup>> => api.get(`${BASE_URL}`, { params });
export const updateGroupAPI = (data: Partial<TGroupREQ>, id: string) => api.put(`${BASE_URL}`, data, { params: { id } });
export const deleteGroupAPI = (params: { id: string }) => api.delete(`${BASE_URL}`, { params });
