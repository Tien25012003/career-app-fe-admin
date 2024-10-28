import { EChatBotType } from '@enum/chat-bot.enum';

export type ChatBotRESP = {
  _id: string;
  question: string;
  answer: string;
  keywords: string;
  type: EChatBotType;
  creator: string;
  createdAt: string;
};
