import { api } from '@api/config';
import { BaseResponse, TPagingResponse } from '@type/response.type';
import { AddPromptREQ, ChatBotREQ } from './request/chat-bot.request';
import { ChatBotRESP } from './response/chat-bot.response';

const BASE_URL = '/chat-bot';

export const getChatBotListAPI = (data: ChatBotREQ): Promise<TPagingResponse<ChatBotRESP[]>> => api.get(BASE_URL, { params: data });

export const addPromptAPI = (data: AddPromptREQ): Promise<BaseResponse<void>> => api.post(BASE_URL, data);
