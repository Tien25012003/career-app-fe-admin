import { api } from '@api/config';
import { TPagingResponse } from '@type/response.type';
import { ChatBotREQ } from './request/chat-bot.request';
import { ChatBotRESP } from './response/chat-bot.response';

const BASE_URL = '/chat-bot';

export const getChatBotListAPI = (data: ChatBotREQ): Promise<TPagingResponse<ChatBotRESP[]>> => api.get(BASE_URL, { params: data });
