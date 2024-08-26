import { PageHeader } from '@component/PageHeader/PageHeader';
import { Button, Group, Stack } from '@mantine/core';
import { IconPlus, IconUser } from '@tabler/icons-react';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function AccountPage() {
  const navigate = useNavigate();
  const [type, setType] = useState('list');
  return (
    <Stack p={'md'}>
      <PageHeader
        title='Quản lý tài khoản'
        leftSection={<IconUser />}
        rightSection={<Button leftSection={<IconPlus size={'1.125rem'} />}>Thêm mới</Button>}
      />
      <Group>
        <Button
          onClick={() => {
            navigate('/accounts');
            setType('list');
          }}
          variant={type === 'list' ? 'filled' : 'outline'}
        >
          Danh sách tài khoản
        </Button>
        <Button
          onClick={() => {
            navigate('/accounts/groups');
            setType('groups');
          }}
          variant={type === 'groups' ? 'filled' : 'outline'}
        >
          Danh sách nhóm
        </Button>
      </Group>
      <Outlet />
    </Stack>
  );
}
