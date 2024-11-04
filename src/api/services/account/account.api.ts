import { api } from '@api/config';
import { TPagingResponse } from '@type/response.type';
import { GetListAccountREQ } from './account.request';
import { TACCOUNT } from './account.response';

const BASE_URL = '/accounts';

export const getAccountListAPI = (data: Partial<GetListAccountREQ>): Promise<TPagingResponse<TACCOUNT[]>> =>
  api.get(`${BASE_URL}/all`, { params: data });

export const getAccount = (params: { userId: string }): Promise<TPagingResponse<TACCOUNT>> => api.get(`${BASE_URL}`, { params });
