import { getMajorsAPI } from '@api/services/dictionary/dictionary.api';
import { MajorREQ } from '@api/services/dictionary/dictionary.request';
import { MajorRESP } from '@api/services/dictionary/dictionary.response';
import AppSearch from '@component/AppSearch/AppSearch';
import AppTable from '@component/AppTable/AppTable';
import { PageHeader } from '@component/PageHeader/PageHeader';
import { TableButton } from '@component/TableButton/TableButton';
import { EGroup } from '@enum/exam';
import { Button, Group, Image, Stack, Text } from '@mantine/core';
import { IconBook2, IconPlus } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'constants/query-key.constants';
import { useFilter } from 'hooks/useFilter';
import useInvalidate from 'hooks/useInvalidate';
import { DataTableColumn } from 'mantine-datatable';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export const initialQuery = {
  group: EGroup.A0,
};

export default function DictionaryPage() {
  const [selectedGroup, setSelectedGroup] = useState(EGroup.A0);

  const { queries, hasNone, onSearch, onReset, getPaginationConfigs } = useFilter<MajorREQ>(initialQuery as any);
  const invalidate = useInvalidate();

  // APIS
  const { data: majors, isFetching: isFetchingMajor } = useQuery({
    queryKey: [QUERY_KEYS.DICTIONARY.LIST, queries],
    queryFn: () => getMajorsAPI({ ...queries }),
    enabled: !hasNone,
  });

  const columns = useMemo<DataTableColumn<MajorRESP>[]>(
    () => [
      {
        accessor: '',
        title: 'STT',
        textAlign: 'center',
        render: (_, index) => <div>{index + 1}</div>,
        width: 50,
      },
      {
        accessor: 'name',
        title: 'Tên ngành',
        width: 150,
        render: (val) => (
          <Text size='sm' fw={'600'}>
            {val.name}
          </Text>
        ),
      },
      {
        accessor: 'image',
        title: 'Hình ảnh',
        width: 200,
        render: ({ image }: { image: string }) => <Image width={100} height={100} radius={'sm'} src={image} fit='fill' />,
      },
      {
        accessor: 'subjects',
        title: 'Môn thi',
        width: 150,
      },

      {
        accessor: 'pros',
        title: 'Lợi thế',
        width: 500,
      },
      {
        accessor: 'cons',
        title: 'Khó khăn',
        width: 500,
      },
      {
        accessor: 'actions',
        title: 'Thao tác',
        render: () => <TableButton onView={() => {}} onEdit={() => {}} onDelete={() => {}} />,
      },
    ],
    [],
  );

  return (
    <Stack my='1rem' mx='1rem'>
      <PageHeader
        title='Từ điển'
        leftSection={<IconBook2 />}
        rightSection={
          <Button leftSection={<IconPlus size={'1.125rem'} />} component={Link} to={'create'}>
            Thêm mới
          </Button>
        }
      />
      <Group wrap='wrap'>
        {Object.keys(EGroup).map((btn, index) => {
          return (
            <Button
              key={index}
              variant={selectedGroup === btn ? 'filled' : 'outline'}
              miw={100}
              onClick={() => {
                setSelectedGroup(btn as EGroup);
                onSearch({ group: btn as EGroup });
              }}
            >
              Khối {btn}
            </Button>
          );
        })}
      </Group>
      <AppSearch onSearch={(val) => onSearch({ name: val })} onReset={onReset} />
      <AppTable
        data={majors?.data || []}
        columns={columns}
        isLoading={isFetchingMajor}
        paginationConfigs={getPaginationConfigs(majors?.pagination?.totalPages, majors?.pagination?.totalCounts)}
      />
    </Stack>
  );
}
