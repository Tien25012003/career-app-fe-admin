import { queryClient } from '@api/config/queryClient';
import { deleteGroupAPI, getGroupListAPI } from '@api/services/group/group.api';
import { GroupREQ } from '@api/services/group/group.request';
import AppSearch from '@component/AppSearch/AppSearch';
import AppTable from '@component/AppTable/AppTable';
import { TableButton } from '@component/TableButton/TableButton';
import { Avatar, Badge, Group, Stack, Tooltip } from '@mantine/core';
import { useMutation, useQuery } from '@tanstack/react-query';
import { DateUtils } from '@util/DateUtils';
import { NotifyUtils } from '@util/NotificationUtils';
import { AxiosError } from 'axios';
import { QUERY_KEYS } from 'constants/query-key.constants';
import { useFilter } from 'hooks/useFilter';
import { useNavigate } from 'react-router-dom';

const BadgeStatus = (status: number) => {
  switch (status) {
    case 0:
      return (
        <Tooltip label='Tạm dừng'>
          <Badge color='red' size='sm'>
            Tạm dừng
          </Badge>
        </Tooltip>
      );
    case 2:
      return (
        <Tooltip label='Đang hoạt động'>
          <Badge size='sm'>Đang hoạt động</Badge>
        </Tooltip>
      );
    default:
      return (
        <Tooltip label='Tạm dừng'>
          <Badge color='red' size='sm'>
            Tạm dừng
          </Badge>
        </Tooltip>
      );
  }
};
export const initialQuery: Partial<GroupREQ> = {
  page: 1,
  size: 10,
};
const AccountGroupListPage = () => {
  const navigate = useNavigate();
  const { queries, hasNone, onSearch, onReset, getPaginationConfigs } = useFilter<Partial<GroupREQ>>(initialQuery);

  // APIS
  const { data: groups, isFetching: isFetchingGroup } = useQuery({
    queryKey: [QUERY_KEYS.GROUP.LIST, queries],
    queryFn: () => getGroupListAPI(queries),
    enabled: !hasNone,
  });
  const { mutate: deleteGroup, isPending } = useMutation({
    mutationFn: (id: string) => deleteGroupAPI({ id }),
    onSuccess: () => {
      NotifyUtils.success('Xóa nhóm thành công!');
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP.LIST, queries],
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      NotifyUtils.error(error.response?.data?.message);
    },
  });

  return (
    <Stack>
      <AppSearch onSearch={(value) => onSearch({ ...queries, groupName: value })} onReset={onReset} />
      <AppTable
        columns={[
          {
            accessor: '_id',
            title: 'ID',
          },
          {
            accessor: 'groupName',
            title: 'Tên nhóm',
          },
          {
            accessor: 'owner.name',
            title: 'Trường nhóm',
          },
          {
            accessor: 'members',
            title: 'Thành viên',
            render: ({ members }) => (
              <Group gap={'xs'}>
                <Avatar.Group>
                  {members.slice(0, 4).map((member) => (
                    <Avatar key={Math.random()} name={member.name} color='initials' />
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
            render: (record) => (
              <TableButton
                onView={() => {
                  navigate(`/accounts/group/view/${record._id}`);
                }}
                onEdit={() => {
                  navigate(`/accounts/group/edit/${record._id}`);
                }}
                onDelete={() => {
                  deleteGroup(record._id);
                }}
              />
            ),
          },
        ]}
        data={groups?.data || []}
        isLoading={isFetchingGroup}
        paginationConfigs={getPaginationConfigs(groups?.pagination?.totalPages, groups?.pagination?.totalCounts)}
      />
    </Stack>
  );
};

export default AccountGroupListPage;
