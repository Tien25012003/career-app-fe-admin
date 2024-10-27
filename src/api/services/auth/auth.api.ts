import { api } from '@api/config';
import { BaseResponse } from '@type/response.type';
import { LoginREQ } from './request/login.request';
import { LoginRESP } from './response/login.response';

export const loginAPI = (data: LoginREQ): Promise<BaseResponse<LoginRESP>> => api.post('/accounts/login', data);
