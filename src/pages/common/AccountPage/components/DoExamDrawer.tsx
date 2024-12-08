import { getDoExamListAPI } from '@api/services/do-exam/do-exam.api';
import { DoExamREQ } from '@api/services/do-exam/do-exam.request';
import { DoExamRESP } from '@api/services/do-exam/do-exam.response';
import AppTable from '@component/AppTable/AppTable';
import { Button, Drawer, Group, Stack, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { DATETIME_FORMAT, DateUtils } from '@util/DateUtils';
import { QUERY_KEYS } from 'constants/query-key.constants';
import { useFilter } from 'hooks/useFilter';
import { DataTableColumn } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';

type DoExamDrawerProps = {
  opened?: boolean;
  onClose?: () => void;
  title?: string;
  examId?: string;
};
export default function DoExamDrawer({ opened = false, onClose, title, examId }: DoExamDrawerProps) {
  const { queries, hasNone, onSearch, onReset, getPaginationConfigs } = useFilter<DoExamREQ>();

  const [search, setSearch] = useState('');

  // APIS
  const { data: doExamList, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.DO_EXAM.LIST, queries, examId],
    queryFn: () => getDoExamListAPI(queries),
    enabled: opened,
  });

  // METHODS
  const handleClose = () => {
    onReset();
    onClose?.();
  };

  // EFFECTS
  useEffect(() => {
    if (opened) {
      onSearch({ examId: examId });
    }
  }, [examId, opened]);

  // RENDERS
  const columns = useMemo<DataTableColumn<DoExamRESP>[]>(
    () => [
      {
        accessor: '',
        title: 'STT',
        textAlign: 'center',
        render: (_, index) => <div>{index + 1}</div>,
      },
      {
        accessor: 'creator',
        title: 'Học sinh',
      },
      {
        accessor: 'totalScore',
        title: 'Tổng điểm',
      },
      {
        accessor: 'createAt',
        title: 'Ngày làm bài',
        width: 300,
        render: (val) => (val.createdAt ? DateUtils.fDate(new Date(val.createdAt), DATETIME_FORMAT) : '_'),
      },
    ],
    [],
  );
  return (
    <Drawer opened={opened} onClose={handleClose} title={title} position='right' size={'lg'}>
      <Stack>
        <Group>
          <TextInput
            flex={1}
            placeholder='Nhập tên học sinh'
            leftSection={<IconSearch size={'1.125rem'} />}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSearch({ creator: search });
              }
            }}
            // defaultValue={queryExam}
          />

          <Button
            variant='outline'
            onClick={() => {
              onReset?.();
              setSearch('');
            }}
          >
            Reset
          </Button>
        </Group>
        <AppTable
          data={doExamList?.data || []}
          columns={columns}
          isLoading={isFetching}
          paginationConfigs={getPaginationConfigs(doExamList?.pagination?.totalPages, doExamList?.pagination?.totalCounts)}
        />
      </Stack>
    </Drawer>
  );
}
