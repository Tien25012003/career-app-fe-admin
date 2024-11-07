import { getGroupListAPI } from '@api/services/group/group.api';
import { GroupREQ } from '@api/services/group/group.request';
import AppSearch from '@component/AppSearch/AppSearch';
import AppTable from '@component/AppTable/AppTable';
import { TableButton } from '@component/TableButton/TableButton';
import { Avatar, Badge, Group, Stack, Tooltip } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { DateUtils } from '@util/DateUtils';
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
        data={groups?.data || []}
        isLoading={isFetchingGroup}
        paginationConfigs={getPaginationConfigs(groups?.pagination?.totalPages, groups?.pagination?.totalCounts)}
      />
    </Stack>
  );
};

export default AccountGroupListPage;
