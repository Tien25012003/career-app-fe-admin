import AppSearch from '@component/AppSearch/AppSearch';
import AppTable from '@component/AppTable/AppTable';
import PageTitle from '@component/PageTitle/PageTitle';
import { Badge, Button, Group, Stack, Text } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import { DateUtils } from '@util/DateUtils';
type TAccount = {
  id: number;
  username: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  status: number; //0: deactive ; 1: active
};
const ACCOUNTS = Array.from<TAccount>({ length: 10 }).fill({
  id: Math.floor(Math.random() * 10000),
  username: 'khang123',
  name: 'Đoàn Tấn Khang',
  updatedAt: new Date(),
  createdAt: new Date(),
  email: 'doank3442@gmail.com',
  status: 0,
});

const BadgeStatus = (status: number) => {
  switch (status) {
    case 0:
      return (
        <Badge color='red' size='sm'>
          Tạm dừng
        </Badge>
      );
    case 2:
      return <Badge size='sm'>Đang hoạt động</Badge>;
    default:
      return (
        <Badge color='red' size='sm'>
          Tạm dừng
        </Badge>
      );
  }
};

export default function AccountPage() {
  return (
    <Stack p={'md'}>
      <Group>
        <IconUser />
        <PageTitle>Quản lý tài khoản</PageTitle>
      </Group>
      <Group>
        <Button>Danh sách tài khoản</Button>
        <Button variant='outline'>Danh sách nhóm</Button>
      </Group>
      <AppSearch />
      <AppTable
        columns={[
          {
            accessor: 'id',
            title: 'ID',
          },
          {
            accessor: 'username',
            title: 'Email',
          },
          {
            accessor: 'name',
            title: 'Tên',
          },
          {
            accessor: 'createdAt',
            title: 'Ngày tạo',
            render: ({ createdAt }) => DateUtils.fDate(createdAt),
          },
          {
            accessor: 'updatedAt',
            title: 'Ngày cập nhật',
            render: ({ updatedAt }) => DateUtils.fDate(updatedAt),
          },
          {
            accessor: 'status',
            title: 'Trạng thái',
            render: ({ status }) => BadgeStatus(status),
          },
        ]}
        data={ACCOUNTS}
        isLoading={false}
      />
    </Stack>
  );
}
