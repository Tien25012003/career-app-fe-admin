import { api } from '@api/config';
import { BaseResponse, TPagingResponse } from '@type/response.type';
import { AddPromptREQ, ChatBotREQ, EditPromptREQ, TChatbotInGroupREQ } from './chat-bot.request';
import { ChatBotRESP } from './chat-bot.response';

const BASE_URL = '/chat-bot';

export const getChatBotListAPI = (data: ChatBotREQ): Promise<TPagingResponse<ChatBotRESP[]>> => api.get(BASE_URL, { params: data });

export const addPromptAPI = (data: AddPromptREQ): Promise<BaseResponse<void>> => api.post(BASE_URL, data);

export const deletePromptAPI = (id: string): Promise<BaseResponse<void>> => api.delete(BASE_URL, { params: { id } });

export const getPromptDetailAPI = (id: string): Promise<BaseResponse<ChatBotRESP>> => api.get(`${BASE_URL}/detail`, { params: { id } });

export const editPromptAPI = (id: string, data: EditPromptREQ): Promise<BaseResponse<void>> => api.put(`${BASE_URL}`, data, { params: { id } });

export const executePromptAPI = (data: { prompt: string }): Promise<BaseResponse<string>> => api.post(`${BASE_URL}/execute`, data);

export const getChatbotInGroupAPI = (data: TChatbotInGroupREQ): Promise<BaseResponse<Pick<ChatBotRESP, '_id' | 'question' | 'createdAt'>[]>> =>
  api.get(`${BASE_URL}/chatbot-in-group`, { params: data });

export const addPromptInGroupAPI = (data: { groupId: string; promptId: string }): Promise<BaseResponse<void>> =>
  api.put(`${BASE_URL}/add-prompt-to-group`, data);
export const getPromptSelectAPI = (): Promise<BaseResponse<{ _id: string; question: string }[]>> => api.get(`${BASE_URL}/select`);

export const removePromptInGroupAPI = (data: { groupId: string; promptId: string }): Promise<BaseResponse<void>> =>
  api.put(`${BASE_URL}/remove-prompt-from-group`, data);
