import { api } from '@api/config';
import { BaseResponse } from '@type/response.type';
import { UploadRESP } from './upload.response';

const BASE_URL = '/uploads';

export const uploadAPI = (data: any): Promise<BaseResponse<UploadRESP>> => api.post(BASE_URL, data);
