import { getExamListAPI, updateStatusAPI } from '@api/services/exam/exam.api';
import { ExamREQ } from '@api/services/exam/exam.request';
import { ExamRESP } from '@api/services/exam/exam.response';
import AppSearch from '@component/AppSearch/AppSearch';
import AppTable from '@component/AppTable/AppTable';
import { TableButton } from '@component/TableButton/TableButton';
import { EExamCategory, EExamStatus, EQuestionType } from '@enum/exam';
import { onError } from '@helper/error.helpers';
import { ActionIcon, Badge, Menu, Stack } from '@mantine/core';
import { IconSettings, IconStatusChange } from '@tabler/icons-react';
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
import { QuestionTypeModal } from '../../components';
import ChangeStatusModal from '../../components/ChangeStatusModal';
import { ColorExamStatus, TextExamStatus } from '../../utils';
type Props = {
  openCreateExamModal: boolean;
  setOpenCreateExamModal: (openCreateExamModal: boolean) => void;
};
export const initialQuery = {
  category: EExamCategory.SYSTEM,
};

export default function ExamManagement({ openCreateExamModal, setOpenCreateExamModal }: Props) {
  // STATES
  const [openChangeStatusModal, setOpenChangeStatusModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ExamRESP | null>(null);

  const navigate = useNavigate();

  const invalidate = useInvalidate();

  const { queries, hasNone, onSearch, onReset, getPaginationConfigs } = useFilter<ExamREQ>(initialQuery);

  // APIS
  const { data: exams, isFetching: isFetchingExam } = useQuery({
    queryKey: [QUERY_KEYS.EXAM.LIST, queries],
    queryFn: () => getExamListAPI(queries),
    enabled: !hasNone,
  });

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
            onView={() => navigate(`${ROUTES.EXAMS.SYSTEM}/${val._id}/${EQuestionType.COMBINE}`)}
            onEdit={() => navigate(`${ROUTES.EXAMS.SYSTEM}/edit/${val._id}/${EQuestionType.COMBINE}`)}
            onDelete={() => onDelete(val._id)}
          />
        ),
      },
      {
        accessor: 'more_actions',
        title: '',
        textAlign: 'center',
        render: (val) => (
          <Menu withArrow shadow='lg'>
            <Menu.Target>
              <ActionIcon variant='transparent'>
                <IconSettings color='grey' />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={() => {
                  setOpenChangeStatusModal(true);
                  setSelectedItem(val as ExamRESP);
                }}
                leftSection={<IconStatusChange color='grey' size={16} />}
              >
                Chuyển trạng thái
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ),
      },
    ],
    [navigate, onDelete],
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
      <ChangeStatusModal
        open={openChangeStatusModal}
        onCancel={() => {
          setOpenChangeStatusModal(false);
          setSelectedItem(null);
        }}
        initialValues={selectedItem as ExamRESP}
      />
    </Stack>
  );
}
