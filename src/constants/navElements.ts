import { NavElement } from "@type/ui/navElements";
import {
  IconHome,
  IconUser,
  IconNews,
  IconPencil,
  IconBook2,
} from "@tabler/icons-react";

export const navElements: NavElement[] = [
  {
    label: "Tổng quan",
    link: "/",
    icon: IconHome,
  },
  {
    label: "Bài kiểm tra",
    link: "/test",
    icon: IconPencil,
  },
  {
    label: "Tin tức",
    link: "/news",
    icon: IconNews,
  },
  {
    label: "Tài khoản",
    link: "/account",
    icon: IconUser,
  },
  {
    label: "Từ điển",
    link: "/dictionary",
    icon: IconBook2,
  },
];
