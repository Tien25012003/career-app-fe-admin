import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { ReactNode } from 'react';

export namespace NotifyUtils {
  export const info = (message: ReactNode) =>
    showNotification({
      title: 'Thông báo',
      message,
      autoClose: 3000,
      withCloseButton: true,
    });

  export const success = (message: ReactNode) =>
    showNotification({
      title: 'Thành công',
      message,
      autoClose: 3000,
      icon: <IconCheck size='1.125rem' />,
      color: 'teal',
      withCloseButton: true,
    });

  export const error = (message: ReactNode) =>
    showNotification({
      title: 'Lỗi',
      message,
      autoClose: 3000,
      icon: <IconX size='1.125rem' />,
      color: 'red',
      withCloseButton: true,
    });
}
