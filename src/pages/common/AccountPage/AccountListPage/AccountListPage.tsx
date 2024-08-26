import AppSearch from '@component/AppSearch/AppSearch';
import AppTable from '@component/AppTable/AppTable';
import { Badge, Stack } from '@mantine/core';
import { DateUtils } from '@util/DateUtils';
import React from 'react';
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
};

export default AccountListPage;
