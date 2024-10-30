export type ChatBotREQ = {
  question?: string;
  answer?: string;
  keywords?: string;
  page?: number;
  size?: number;
};

export type AddPromptREQ = {
  question?: string;
  answer?: string;
  keywords?: string;
};

export type EditPromptREQ = {
  question?: string;
  answer?: string;
  keywords?: string;
};
