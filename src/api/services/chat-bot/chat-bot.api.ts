import { api } from '@api/config';
import { BaseResponse, TPagingResponse } from '@type/response.type';
import { AddPromptREQ, ChatBotREQ, EditPromptREQ } from './chat-bot.request';
import { ChatBotRESP } from './chat-bot.response';

const BASE_URL = '/chat-bot';

export const getChatBotListAPI = (data: ChatBotREQ): Promise<TPagingResponse<ChatBotRESP[]>> => api.get(BASE_URL, { params: data });

export const addPromptAPI = (data: AddPromptREQ): Promise<BaseResponse<void>> => api.post(BASE_URL, data);

export const deletePromptAPI = (id: string): Promise<BaseResponse<void>> => api.delete(BASE_URL, { params: { id } });

export const getPromptDetailAPI = (id: string): Promise<BaseResponse<ChatBotRESP>> => api.get(`${BASE_URL}/detail`, { params: { id } });

export const editPromptAPI = (id: string, data: EditPromptREQ): Promise<BaseResponse<void>> => api.put(`${BASE_URL}`, data, { params: { id } });

export const executePromptAPI = (data: { prompt: string }): Promise<BaseResponse<string>> => api.post(`${BASE_URL}/execute`, data);
