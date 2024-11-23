import { ENAV_BAR_CODE } from '@enum/nav-bar.enum';
import { IconBook2, IconBrandWechat, IconHome, IconNews, IconPencil, IconUser } from '@tabler/icons-react';
import { NavElement } from '@type/ui/navElements';

export const navElements: NavElement[] = [
  {
    label: 'Tổng quan',
    link: '/',
    icon: IconHome,
    code: ENAV_BAR_CODE.DASHBOARD,
  },
  {
    label: 'Tài khoản',
    link: '/accounts',
    icon: IconUser,
    code: ENAV_BAR_CODE.ACCOUNT,
  },
  {
    label: 'Bài kiểm tra',
    code: ENAV_BAR_CODE.EXAM_CUSTOM,
    //link: '/exams',
    icon: IconPencil,
    children: [
      {
        label: 'Bài kiểm tra của hệ thống',
        link: '/exams/system',
        code: ENAV_BAR_CODE.EXAM_SYSTEM,
      },
      {
        label: 'Bài kiểm tra tự thiết kế',
        link: '/exams/design',
        code: ENAV_BAR_CODE.EXAM_CUSTOM,
      },
    ],
  },
  {
    label: 'Tin tức',
    link: '/news',
    icon: IconNews,
    code: ENAV_BAR_CODE.NEWS,
  },
  {
    label: 'Chat bot',
    link: '/chatbot',
    icon: IconBrandWechat,
    code: ENAV_BAR_CODE.CHATBOT,
  },
  {
    label: 'Từ điển',
    link: '/dictionary',
    icon: IconBook2,
    code: ENAV_BAR_CODE.LIBRARY,
  },
];
