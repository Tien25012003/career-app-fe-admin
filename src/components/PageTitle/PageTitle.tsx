import { Text } from '@mantine/core';
import usePageTitle from 'hooks/usePageTitle';
type TPageTitle = {
  children: string;
};
export default function PageTitle({ children }: TPageTitle) {
  usePageTitle(children);
  return (
    <Text size='xl' fw={500}>
      {children}
    </Text>
  );
}
