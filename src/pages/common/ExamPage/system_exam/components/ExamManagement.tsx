import { getExamListAPI } from '@api/services/exam/exam.api';
import { ExamREQ } from '@api/services/exam/exam.request';
import { ExamRESP } from '@api/services/exam/exam.response';
import AppSearch from '@component/AppSearch/AppSearch';
import AppTable from '@component/AppTable/AppTable';
import { TableButton } from '@component/TableButton/TableButton';
import { EExamCategory, EExamStatus, EQuestionType } from '@enum/exam';
import { Badge, Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { DATETIME_FORMAT, DateUtils } from '@util/DateUtils';
import { QUERY_KEYS } from 'constants/query-key.constants';
import { ROUTES } from 'constants/routes.constants';
import { useFilter } from 'hooks/useFilter';
import { DataTableColumn } from 'mantine-datatable';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionTypeModal } from '../../components';
import { ColorExamStatus, TextExamStatus } from '../../utils';
type Props = {
  openCreateExamModal: boolean;
  setOpenCreateExamModal: (openCreateExamModal: boolean) => void;
};
export const initialQuery = {
  category: EExamCategory.SYSTEM,
};

export default function ExamManagement({ openCreateExamModal, setOpenCreateExamModal }: Props) {
  const navigate = useNavigate();

  const { queries, hasNone, onSearch, onReset, getPaginationConfigs } = useFilter<ExamREQ>(initialQuery);

  // APIS
  const { data: exams, isFetching: isFetchingExam } = useQuery({
    queryKey: [QUERY_KEYS.EXAM.LIST, queries],
    queryFn: () => getExamListAPI(queries),
    enabled: !hasNone,
  });

  // METHODS

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
          <TableButton onView={() => navigate(`${ROUTES.EXAMS.SYSTEM}/${val._id}/${EQuestionType.COMBINE}`)} onEdit={() => {}} onDelete={() => {}} />
        ),
      },
    ],
    [navigate],
  );
  return (
    <Stack>
      <AppSearch onSearch={(val) => onSearch({ name: val })} onReset={onReset} />
      <AppTable
        data={exams?.data || []}
        columns={columns}
        isLoading={isFetchingExam}
        paginationConfigs={getPaginationConfigs(exams?.pagination?.totalPages, exams?.pagination?.totalCounts)}
      />
      <QuestionTypeModal
        opened={openCreateExamModal}
        onCancel={() => setOpenCreateExamModal(false)}
        onFinish={(allQuestionType) => {
          navigate(`create/${allQuestionType}`);
        }}
      />
    </Stack>
  );
}
