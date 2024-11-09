import { getExamListAPI, updateStatusAPI } from '@api/services/exam/exam.api';
import { ExamREQ } from '@api/services/exam/exam.request';
import { ExamRESP } from '@api/services/exam/exam.response';
import AppSearch from '@component/AppSearch/AppSearch';
import AppTable from '@component/AppTable/AppTable';
import { PageHeader } from '@component/PageHeader/PageHeader';
import { TableButton } from '@component/TableButton/TableButton';
import { EExamCategory, EExamStatus, EQuestionType } from '@enum/exam';
import { onError } from '@helper/error.helpers';
import { Badge, Button, Stack } from '@mantine/core';
import { IconPencil, IconPlus } from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { DATETIME_FORMAT, DateUtils } from '@util/DateUtils';
import { NotifyUtils } from '@util/NotificationUtils';
import { QUERY_KEYS } from 'constants/query-key.constants';
import { ROUTES } from 'constants/routes.constants';
import { useFilter } from 'hooks/useFilter';
import useInvalidate from 'hooks/useInvalidate';
import { DataTableColumn } from 'mantine-datatable';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionTypeModal } from '../components';
import { ColorExamStatus, TextExamStatus } from '../utils';

export const initialQuery = {
  category: EExamCategory.DESIGN,
};

export default function DesignExam() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const navigate = useNavigate();

  const { queries, hasNone, onSearch, onReset, getPaginationConfigs } = useFilter<ExamREQ>(initialQuery);

  const invalidate = useInvalidate();

  // APIS
  const { data: exams, isFetching: isFetchingExam } = useQuery({
    queryKey: [QUERY_KEYS.EXAM.DESIGN_LIST, queries],
    queryFn: () => getExamListAPI(queries),
    enabled: !hasNone,
  });

  // const { mutate: deleteExamMutation, isPending: isDeleting } = useMutation({
  //   mutationFn: (id: string) => deleteExamAPI(id),
  //   onSuccess: () => {
  //     invalidate({
  //       queryKey: [QUERY_KEYS.EXAM.DESIGN_LIST],
  //     });
  //     NotifyUtils.success('Xoá bài kiểm tra thành công!');
  //   },
  //   onError,
  // });

  const { mutate: updateStatusMutation, isPending: isUpdatingStatus } = useMutation({
    mutationFn: (data: { id: string; status: EExamStatus }) => updateStatusAPI(data.id, data.status),
    onSuccess: () => {
      invalidate({
        queryKey: [QUERY_KEYS.EXAM.DESIGN_LIST],
      });
      NotifyUtils.success('Xoá bài kiểm tra thành công!');
    },
    onError,
  });

  // METHODS
  const onDelete = useCallback(
    (id: string) => {
      updateStatusMutation({ id, status: EExamStatus.BLOCKED });
    },
    [updateStatusMutation],
  );

  const columns = useMemo<DataTableColumn<ExamRESP>[]>(
    () => [
      {
        accessor: '',
        title: 'STT',
        textAlign: 'center',
        render: (_, index) => <div>{index + 1}</div>,
      },
      {
        accessor: '_id',
        title: 'ID',
        width: 300,
      },
      {
        accessor: 'name',
        title: 'Tên',
        width: 200,
      },
      {
        accessor: 'status',
        title: 'Trạng thái',
        textAlign: 'center',
        width: 200,
        render: (val) => (
          <Badge size='sm' color={ColorExamStatus(val.status as EExamStatus)} className='mx-auto'>
            {TextExamStatus[val.status as EExamStatus]}
          </Badge>
        ),
      },
      {
        accessor: 'createAt',
        title: 'Ngày tạo',
        width: 300,
        render: (val) => (val.createdAt ? DateUtils.fDate(new Date(val.createdAt), DATETIME_FORMAT) : '_'),
      },
      {
        accessor: 'creator',
        title: 'Người tạo',
      },
      {
        accessor: 'updateAt',
        title: 'Ngày sửa đổi',
        width: 300,
        render: (val) => (val.updatedAt ? DateUtils.fDate(new Date(val.updatedAt), DATETIME_FORMAT) : '_'),
      },
      {
        accessor: 'updator',
        title: 'Người sửa đổi',
      },
      {
        accessor: 'actions',
        title: 'Thao tác',
        render: (val) => (
          <TableButton
            onView={() => navigate(`${ROUTES.EXAMS.DESIGN}/${val._id}/${EQuestionType.COMBINE}`)}
            onEdit={() => {}}
            onDelete={() => onDelete(val._id)}
          />
        ),
      },
    ],
    [navigate, onDelete],
  );
  return (
    <Stack my='1rem' mx='1rem'>
      <PageHeader
        title='Quản lý bài kiểm tra tự thiết kế'
        leftSection={<IconPencil />}
        rightSection={
          <Button leftSection={<IconPlus size={'1.125rem'} />} onClick={() => setOpenCreateModal(true)}>
            Thêm mới
          </Button>
        }
      />
      <AppSearch />
      <AppTable
        data={exams?.data || []}
        columns={columns}
        isLoading={isFetchingExam || isUpdatingStatus}
        paginationConfigs={getPaginationConfigs(exams?.pagination?.totalPages, exams?.pagination?.totalCounts)}
        //onRowClick={(row) => navigate(`${ROUTES.EXAMS.DESIGN}/${row.record._id}/${EQuestionType.COMBINE}`)}
      />
      <QuestionTypeModal
        opened={openCreateModal}
        onCancel={() => setOpenCreateModal(false)}
        onFinish={(allQuestionType) => {
          navigate(`create/${allQuestionType}`);
        }}
      />
    </Stack>
  );
}
