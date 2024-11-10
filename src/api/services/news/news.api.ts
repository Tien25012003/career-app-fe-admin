import { api } from '@api/config';
import { TPagingResponse } from '@type/response.type';
const BASE_URL = '/news';

export const getAllNewsAPI = (): Promise<TPagingResponse<NewsItem[]>> => api.get(`${BASE_URL}/all`);
