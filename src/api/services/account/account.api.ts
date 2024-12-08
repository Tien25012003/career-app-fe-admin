import { api } from '@api/config';
import { TPagingResponse } from '@type/response.type';
import { GetListAccountREQ, GetMemberAccountREQ, TAccountName, TAccountREQ } from './account.request';
import { TACCOUNT } from './account.response';

const BASE_URL = '/accounts';

export const getAccountListAPI = (data: Partial<GetListAccountREQ>): Promise<TPagingResponse<TACCOUNT[]>> =>
  api.get(`${BASE_URL}/all`, { params: data });
export const getMemberAccountListAPI = (data: Partial<GetMemberAccountREQ>): Promise<TPagingResponse<TACCOUNT[]>> =>
  api.get(`${BASE_URL}/list-member-account`, { params: data });

export const getAccount = (params: { userId: string }): Promise<TPagingResponse<TAccountREQ>> => api.get(`${BASE_URL}`, { params });
export const createAccountAPI = (body: Partial<TAccountREQ>): Promise<TPagingResponse<void>> => api.post(`${BASE_URL}`, body);
export const getListAccountName = (params: { keyword: string }): Promise<TPagingResponse<TAccountName[]>> =>
  api.get(`${BASE_URL}/account-name`, { params });
export const updateAccountAPI = (body: Partial<TAccountREQ>, id: string): Promise<TPagingResponse<void>> =>
  api.put(`${BASE_URL}/info`, body, { params: { id } });
export const updateStatusAccountAPI = (body: { status: number }, params: { id: string }): Promise<TPagingResponse<void>> =>
  api.put(`${BASE_URL}/status`, body, { params });

export const createAccountWithTokenAPI = (body: Partial<TAccountREQ>): Promise<TPagingResponse<void>> => api.post(`${BASE_URL}/create-account`, body);
