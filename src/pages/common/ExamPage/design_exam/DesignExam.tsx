import AppSearch from '@component/AppSearch/AppSearch';
import AppTable from '@component/AppTable/AppTable';
import { PageHeader } from '@component/PageHeader/PageHeader';
import { Badge, Button, Stack } from '@mantine/core';
import { IconPencil, IconPlus } from '@tabler/icons-react';
import { examDummmyData } from '../dummyData';
import { ColorExamStatus, TextExamStatus } from '../utils';
import { EExamStatus } from '@interface/exam';
import { DATETIME_FORMAT, DateUtils } from '@util/DateUtils';
import { TableButton } from '@component/TableButton/TableButton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { QuestionTypeModal } from '../components';

export default function DesignExam() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const navigate = useNavigate();
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
        data={examDummmyData}
        columns={[
          {
            accessor: '_id',
            title: 'ID',
            width: 300,
          },
          {
            accessor: 'type',
            title: 'Tên',
            width: 100,
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
            width: 200,
            render: (val) => DateUtils.fDate(val.createAt, DATETIME_FORMAT),
          },
          {
            accessor: 'creator',
            title: 'Người tạo',
            width: 200,
          },
          {
            accessor: 'updateAt',
            title: 'Ngày sửa đổi',
            width: 200,
            render: (val) => DateUtils.fDate(val.createAt, DATETIME_FORMAT),
          },
          {
            accessor: 'updator',
            title: 'Người sửa đổi',
            width: 200,
          },
          {
            accessor: 'actions',
            title: 'Thao tác',
            render: () => <TableButton onView={() => {}} onEdit={() => {}} onDelete={() => {}} />,
          },
        ]}
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
