import { Icon } from "@tabler/icons-react";

export type NavElement = {
  label: string;
  link?: string;
  icon?: Icon;
  children?: NavElement[];
};
