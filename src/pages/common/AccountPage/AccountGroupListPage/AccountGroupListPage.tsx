import AppSearch from '@component/AppSearch/AppSearch';
import AppTable from '@component/AppTable/AppTable';
import { TableButton } from '@component/TableButton/TableButton';
import { Avatar, Badge, Group, Stack } from '@mantine/core';
import { DateUtils } from '@util/DateUtils';
import React from 'react';
import { useNavigate } from 'react-router-dom';
type TAccount = {
  id: number;
  groupName: string;
  members: string[];
  owner: string;
  createdAt: Date;
  updatedAt: Date;
  status: number; //0: deactive ; 1: active
};
const ACCOUNTS = Array.from<TAccount>({ length: 10 }).fill({
  id: Math.floor(Math.random() * 10000),
  groupName: 'Nhóm học tập',
  members: ['Khang', 'Tiên', 'Tiền', 'Đình', 'Binh', 'La', 'Binh', 'La'],
  owner: 'Đoàn Tấn Khang',
  updatedAt: new Date(),
  createdAt: new Date(),
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
const AccountGroupListPage = () => {
  const navigate = useNavigate();
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
            accessor: 'groupName',
            title: 'Tên nhóm',
          },
          {
            accessor: 'owner',
            title: 'Trường nhóm',
          },
          {
            accessor: 'members',
            title: 'Thành viên',
            render: ({ members }) => (
              <Group gap={'xs'}>
                <Avatar.Group>
                  {members.slice(0, 4).map((member) => (
                    <Avatar key={Math.random()} name={member} color='initials' />
                  ))}
                  {members.length > 5 && <Avatar key={Math.random()} name={`+${members.length - 4}`} color='gray'></Avatar>}
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
            render: () => (
              <TableButton
                onView={() => {
                  navigate('/accounts/create/group');
                }}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            ),
          },
        ]}
        data={ACCOUNTS}
        isLoading={false}
      />
    </Stack>
  );
};

export default AccountGroupListPage;
