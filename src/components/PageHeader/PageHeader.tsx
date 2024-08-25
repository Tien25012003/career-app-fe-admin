import PageTitle from '@component/PageTitle/PageTitle';
import { Group } from '@mantine/core';
type TPageHeader = {
  title: string;
  leftSection?: React.ReactNode;
  middleSection?: React.ReactNode;
  rightSection?: React.ReactNode;
};
export function PageHeader({ title, leftSection, middleSection, rightSection }: TPageHeader) {
  return (
    <Group justify='space-between'>
      <Group>
        {leftSection && leftSection}
        <PageTitle>{title}</PageTitle>
        {middleSection && middleSection}
      </Group>
      {rightSection && rightSection}
    </Group>
  );
}
