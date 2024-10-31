import { IconBook2, IconBrandWechat, IconHome, IconNews, IconPencil, IconUser } from '@tabler/icons-react';
import { NavElement } from '@type/ui/navElements';

export const navElements: NavElement[] = [
  {
    label: 'Tổng quan',
    link: '/',
    icon: IconHome,
  },
  {
    label: 'Tài khoản',
    link: '/accounts',
    icon: IconUser,
  },
  {
    label: 'Bài kiểm tra',
    //link: '/exams',
    icon: IconPencil,
    children: [
      {
        label: 'Bài kiểm tra của hệ thống',
        link: '/exams/system',
      },
      {
        label: 'Bài kiểm tra tự thiết kế',
        link: '/exams/design',
      },
    ],
  },
  {
    label: 'Tin tức',
    link: '/news',
    icon: IconNews,
  },
  {
    label: 'Chat bot',
    link: '/chatbot',
    icon: IconBrandWechat,
  },
  {
    label: 'Từ điển',
    link: '/dictionary',
    icon: IconBook2,
  },
];
