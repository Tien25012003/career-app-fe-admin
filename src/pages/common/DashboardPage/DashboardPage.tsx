import { PageHeader } from '@component/PageHeader/PageHeader';
import { Stack } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import { ScoreChart, Statistics } from './components';

export default function DashboardPage() {
  return (
    <Stack my='1rem' mx='1rem'>
      <PageHeader title='Tổng quan' leftSection={<IconHome />} />
      <Statistics />
      {/* <UserChart /> */}
      <ScoreChart />
    </Stack>
  );
}
