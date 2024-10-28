import { NotifyUtils } from '@util/NotificationUtils';
import { AxiosError } from 'axios';

export const getErrorMessage = (error: AxiosError | string): string => {
  if (typeof error === 'string') {
    return error;
  }

  if (!error.isAxiosError) {
    return '';
  }

  if (error.response) {
    const data: any = error.response.data;

    if (Array.isArray(data?.message)) {
      return data?.message.map((item: string) => item).join(', ');
    }

    if (typeof data?.message === 'string') {
      const message = data?.message;
      const index = message.indexOf(':');
      return index !== -1 ? message.substring(index + 1).trim() : message;
    }
  }

  if (error.message || (typeof error.message === 'string' && !error.isAxiosError)) {
    return error.message;
  }

  return '';
};

export const onError = (error: AxiosError) => {
  const message = getErrorMessage(error);
  NotifyUtils.error(message);
};
