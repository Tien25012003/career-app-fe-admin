import AppSearch from '@component/AppSearch/AppSearch';
import AppTable from '@component/AppTable/AppTable';
import { TableButton } from '@component/TableButton/TableButton';
import { Avatar, Badge, Group, Stack } from '@mantine/core';
import { DateUtils } from '@util/DateUtils';
import React from 'react';
type TAccount = {
  id: number;
  username: string;
  name: string;
  email: string;
  groups: string[];
  createdAt: Date;
  updatedAt: Date;
  status: number; //0: deactive ; 1: active
};
const ACCOUNTS = Array.from<TAccount>({ length: 10 }).fill({
  id: Math.floor(Math.random() * 10000),
  username: 'khang123',
  name: 'Đoàn Tấn Khang',
  groups: ['Group A', 'Group B'],
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
const AccountListPage = () => {
  return (
    <Stack>
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
            accessor: 'groups',
            title: 'Nhóm tham gia',
            render: ({ groups }) => (
              <Group gap={'xs'}>
                <Avatar.Group>
                  {groups.slice(0, 4).map((group) => (
                    <Avatar key={group} name={group} color='initials' />
                  ))}
                  {groups.length > 5 && (
                    <Avatar name={`+${groups.length - 4}`} color='gray'></Avatar>
                  )}
                </Avatar.Group>
              </Group>
            ),
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
          {
            accessor: 'actions',
            title: 'Thao tác',
            render: () => <TableButton onView={() => {}} onEdit={() => {}} onDelete={() => {}} />,
          },
        ]}
        data={ACCOUNTS}
        isLoading={false}
      />
    </Stack>
  );
};

export default AccountListPage;
