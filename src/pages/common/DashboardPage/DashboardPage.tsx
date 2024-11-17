import PageTitle from '@component/PageTitle/PageTitle';
import { Stack } from '@mantine/core';
import { ScoreChart, Statistics } from './components';

export default function DashboardPage() {
  return (
    <Stack my='1rem' mx='1rem'>
      <PageTitle>Tổng quan</PageTitle>
      <Statistics />
      {/* <UserChart /> */}
      <ScoreChart />
    </Stack>
  );
}
