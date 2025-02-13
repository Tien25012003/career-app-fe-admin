import { api } from '@api/config';
import { BaseResponse } from '@type/response.type';
import { ForgotPasswordREQ, LoginREQ } from './auth.request';
import { LoginRESP, UserInfoRES } from './auth.response';

export const loginAPI = (data: LoginREQ): Promise<BaseResponse<LoginRESP>> => api.post('/accounts/login', data);

export const logoutAPI = (): Promise<BaseResponse<void>> => api.post('/accounts/logout');

export const getUserInfoAPI = (): Promise<BaseResponse<UserInfoRES>> => api.get('/accounts');
export const forgotPasswordAPI = (data: ForgotPasswordREQ): Promise<BaseResponse<void>> => api.post('/accounts/forgotPassword', data);
