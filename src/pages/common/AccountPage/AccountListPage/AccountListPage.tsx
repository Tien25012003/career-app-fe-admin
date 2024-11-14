import { getAccountListAPI } from '@api/services/account/account.api';
import { GetListAccountREQ } from '@api/services/account/account.request';
import AppSearch from '@component/AppSearch/AppSearch';
import AppTable from '@component/AppTable/AppTable';
import { TableButton } from '@component/TableButton/TableButton';
import { Avatar, Badge, Group, Stack, Tooltip } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { DATETIME_FORMAT, DateUtils } from '@util/DateUtils';
import { QUERY_KEYS } from 'constants/query-key.constants';
import { useFilter } from 'hooks/useFilter';
import { useNavigate } from 'react-router-dom';
import AccountFilterDrawer from '../AccountGroupListPage/components/AccountFilterDrawer';
import { useDisclosure } from '@mantine/hooks';

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
export const initialQuery: Partial<GetListAccountREQ> = {
  page: 1,
  size: 10,
};
const AccountListPage = () => {
  const navigate = useNavigate();
  const [openedFilter, { open: openFilter, close: closeFilter }] = useDisclosure(false);
  const { queries, hasNone, onSearch, onReset, getPaginationConfigs } = useFilter<Partial<GetListAccountREQ>>(initialQuery);

  // APIS
  const { data: accounts, isFetching: isFetchingAccount } = useQuery({
    queryKey: [QUERY_KEYS.ACCOUNT.LIST, queries],
    queryFn: () => getAccountListAPI(queries),
    enabled: !hasNone,
  });
  return (
    <Stack>
      <AppSearch onSearch={(value) => onSearch({ ...queries, name: value })} onReset={onReset} onFilter={openFilter} />
      <AppTable
        columns={[
          {
            accessor: '_id',
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
                    <Tooltip label={group.groupName}>
                      <Avatar key={Math.random()} name={group.groupName} color='initials' />
                    </Tooltip>
                  ))}
                  {groups.length > 5 && <Avatar key={Math.random()} name={`+${groups.length - 4}`} color='gray'></Avatar>}
                </Avatar.Group>
              </Group>
            ),
          },
          {
            accessor: 'role',
            title: 'Quyền',
          },
          {
            accessor: 'createdAt',
            title: 'Ngày tạo',
            render: ({ createdAt }) => DateUtils.fDate(createdAt, DATETIME_FORMAT),
          },
          {
            accessor: 'updatedAt',
            title: 'Ngày cập nhật',
            render: ({ updatedAt }) => DateUtils.fDate(updatedAt, DATETIME_FORMAT),
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
                  navigate(`/accounts/view/${record._id}`);
                }}
                onEdit={() => {
                  navigate(`/accounts/edit/${record._id}`);
                }}
                onDelete={() => {}}
              />
            ),
          },
        ]}
        data={accounts?.data || []}
        isLoading={isFetchingAccount}
        paginationConfigs={getPaginationConfigs(accounts?.pagination?.totalPages, accounts?.pagination?.totalCounts)}
      />
      <AccountFilterDrawer
        onClose={closeFilter}
        onResetFilter={onReset}
        onSubmitFilter={(value) => {
          onSearch({
            ...queries,
            ...value,
          });
        }}
        opened={openedFilter}
      />
    </Stack>
  );
};

export default AccountListPage;
