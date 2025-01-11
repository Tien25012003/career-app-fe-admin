import { api } from '@api/config';
import { TPagingResponse } from '@type/response.type';
import { TDeleteNewsREQ, TNewsDetailREQ, TNewsREQ } from './news.request';
import { NewsItem, TNewsCategory } from './news.response';
const BASE_URL = '/news';

export const getAllNewsAPI = (params: TNewsREQ): Promise<TPagingResponse<NewsItem[]>> => api.get(`${BASE_URL}/all`, { params });
export const getNewsDetailAPI = (params: TNewsDetailREQ): Promise<NewsItem> => api.get(`${BASE_URL}/detail`, { params });

export const getNewsCategoryAPI = (): Promise<TPagingResponse<TNewsCategory[]>> => api.get(`${BASE_URL}/categories`);
export const createNewsAPI = (data: Omit<NewsItem, '_id' | 'createdAt'>) => api.post(`${BASE_URL}/addNews`, data);
export const updateNewsAPI = (data: Partial<Omit<NewsItem, 'createdAt'>>) => api.put(`${BASE_URL}/updateNew`, data);
export const deleteNewsAPI = (data: TDeleteNewsREQ) => api.delete(`${BASE_URL}/deleteNews`, { data: data });
