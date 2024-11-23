import { PageHeader } from '@component/PageHeader/PageHeader';
import { EROLE } from '@enum/account.enum';
import { Stack } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import { userInfoAtom } from 'atoms/auth.store';
import { useAtom } from 'jotai';
import { ScoreChart, Statistics } from './components';

export default function DashboardPage() {
  const [userInfo] = useAtom(userInfoAtom);
  return (
    <Stack my='1rem' mx='1rem'>
      <PageHeader title='Tổng quan' leftSection={<IconHome />} />
      <Statistics />
      {/* <UserChart /> */}
      {userInfo?.role === EROLE.ADMIN && <ScoreChart />}
    </Stack>
  );
}
