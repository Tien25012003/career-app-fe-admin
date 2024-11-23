import { ENAV_BAR_CODE } from '@enum/nav-bar.enum';
import { Icon } from '@tabler/icons-react';

export type NavElement = {
  label: string;
  link?: string;
  icon?: Icon;
  children?: NavElement[];
  code?: ENAV_BAR_CODE;
};
