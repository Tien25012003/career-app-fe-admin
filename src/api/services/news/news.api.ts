import { api } from '@api/config';
import { TPagingResponse } from '@type/response.type';
import { TNewsREQ } from './news.request';
import { NewsItem, TNewsCategory } from './news.response';
const BASE_URL = '/news';

export const getAllNewsAPI = (params: TNewsREQ): Promise<TPagingResponse<NewsItem[]>> => api.get(`${BASE_URL}/all`, { params });
export const getNewsCategoryAPI = (): Promise<TPagingResponse<TNewsCategory[]>> => api.get(`${BASE_URL}/categories`);
export const createNewsAPI = (data: Omit<NewsItem, '_id' | 'createdAt'>) => api.post(`${BASE_URL}/addNews`, data);
