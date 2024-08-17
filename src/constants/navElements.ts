import { NavElement } from '@type/ui/navElements';
import {
  IconHome,
  IconUser,
  IconNews,
  IconPencil,
  IconBook2,
  IconBrandWechat,
} from '@tabler/icons-react';

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
    link: '/exams',
    icon: IconPencil,
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
