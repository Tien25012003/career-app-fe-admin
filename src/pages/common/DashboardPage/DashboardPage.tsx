import PageTitle from '@component/PageTitle/PageTitle';
import { Stack } from '@mantine/core';
import { UserChart, Statistics, ScoreChart } from './components';

export default function DashboardPage() {
  return (
    <Stack my='1rem' mx='1rem'>
      <PageTitle>Tổng quan</PageTitle>
      <Statistics />
      <UserChart />
      <ScoreChart />
    </Stack>
  );
}
