import { api } from '@api/config';
import { TPagingResponse } from '@type/response.type';
import { GetListAccountREQ, TAccountREQ } from './account.request';
import { TACCOUNT } from './account.response';

const BASE_URL = '/accounts';

export const getAccountListAPI = (data: Partial<GetListAccountREQ>): Promise<TPagingResponse<TACCOUNT[]>> =>
  api.get(`${BASE_URL}/all`, { params: data });

export const getAccount = (params: { userId: string }): Promise<TPagingResponse<TAccountREQ>> => api.get(`${BASE_URL}`, { params });
export const createAccountAPI = (body: Partial<TAccountREQ>): Promise<TPagingResponse<void>> => api.post(`${BASE_URL}`, body);
