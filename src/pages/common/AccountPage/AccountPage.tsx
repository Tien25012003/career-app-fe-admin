import { PageHeader } from '@component/PageHeader/PageHeader';
import { Button, Group, Stack } from '@mantine/core';
import { IconPlus, IconUser } from '@tabler/icons-react';
import { startTransition, Suspense, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import AccountListPage from './AccountListPage/AccountListPage';
import AccountGroupListPage from './AccountGroupListPage/AccountGroupListPage';

export default function AccountPage() {
  const [type, setType] = useState('list');

  const handleTypeChange = (newType: 'list' | 'groups') => {
    startTransition(() => {
      setType(newType);
    });
  };
  return (
    <Stack p={'md'}>
      <PageHeader
        title='Quản lý tài khoản'
        leftSection={<IconUser />}
        rightSection={
          <Button
            leftSection={<IconPlus size={'1.125rem'} />}
            component={Link}
            to={type === 'list' ? '/accounts/create' : '/accounts/create/group'}
          >
            Thêm mới
          </Button>
        }
      />
      <Group>
        <Button
          onClick={() => {
            handleTypeChange('list');
          }}
          variant={type === 'list' ? 'filled' : 'outline'}
        >
          Danh sách tài khoản
        </Button>
        <Button
          onClick={() => {
            handleTypeChange('groups');
          }}
          variant={type === 'groups' ? 'filled' : 'outline'}
        >
          Danh sách nhóm
        </Button>
      </Group>
      {type === 'list' ? <AccountListPage /> : <AccountGroupListPage />}
    </Stack>
  );
}
