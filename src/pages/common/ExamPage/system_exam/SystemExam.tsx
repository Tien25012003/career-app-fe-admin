import AppSearch from '@component/AppSearch/AppSearch';
import AppTable from '@component/AppTable/AppTable';
import { PageHeader } from '@component/PageHeader/PageHeader';
import { Badge, Button, Group, Stack } from '@mantine/core';
import { IconFileUpload, IconPencil, IconPlus } from '@tabler/icons-react';
import { examDummmyData } from '../dummyData';
import { ColorExamStatus, TextExamStatus } from '../utils';
import { DATETIME_FORMAT, DateUtils } from '@util/DateUtils';
import { TableButton } from '@component/TableButton/TableButton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { QuestionTypeModal } from '../components';
import { SchoolScore } from './components/SchoolScore';
import { Conclusion } from './components/Conclusion';
import { EExamStatus } from '@enum/exam';

type THeader = {
  name: 'HOLLAND_IQ_EQ' | 'SchoolScore' | 'Conclusion';
  label: string;
};

const HEADERS: THeader[] = [
  {
    name: 'HOLLAND_IQ_EQ',
    label: 'Holland - IQ - EQ',
  },
  {
    name: 'SchoolScore',
    label: 'Điểm học bạ',
  },
  {
    name: 'Conclusion',
    label: 'Kết luận',
  },
];

export default function SystemExam() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectedHeader, setSelectedHeader] = useState(HEADERS[0].name);
  const [openCreateSubjectModal, setOpenCreateSubjectModal] = useState(false);
  const [openCreateConclusionModal, setOpenCreateConclusionModal] = useState(false);
  const navigate = useNavigate();
  return (
    <Stack my='1rem' mx='1rem'>
      <PageHeader
        title='Quản lý bài kiểm tra hệ thống'
        leftSection={<IconPencil />}
        rightSection={
          <Button
            leftSection={<IconPlus size={'1.125rem'} />}
            onClick={() => {
              if (selectedHeader === 'HOLLAND_IQ_EQ') {
                setOpenCreateModal(true);
              }
              if (selectedHeader === 'SchoolScore') {
                setOpenCreateSubjectModal(true);
              }
              if (selectedHeader === 'Conclusion') {
                setOpenCreateConclusionModal(true);
              }
            }}
          >
            Thêm mới
          </Button>
        }
      />
      <Group wrap='wrap' justify='space-between'>
        <Group>
          {HEADERS?.map((header, index) => (
            <Button key={index} variant={selectedHeader === header.name ? 'filled' : 'outline'} onClick={() => setSelectedHeader(header.name)}>
              {header.label}
            </Button>
          ))}
        </Group>
        {selectedHeader === 'Conclusion' && (
          <Button variant='light' leftSection={<IconFileUpload />}>
            Upload Excel File
          </Button>
        )}
      </Group>
      {selectedHeader === 'HOLLAND_IQ_EQ' && (
        <Stack>
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
                render: (val) => DateUtils.fDate(new Date(val.createdAt), DATETIME_FORMAT),
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
                render: (val) => DateUtils.fDate(new Date(val.createdAt), DATETIME_FORMAT),
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
      )}
      {selectedHeader === 'SchoolScore' && (
        <SchoolScore openCreateSubjectModal={openCreateSubjectModal} setOpenCreateSubjectModal={setOpenCreateSubjectModal} />
      )}
      {selectedHeader === 'Conclusion' && (
        <Conclusion openCreateConclusionModal={openCreateConclusionModal} setOpenCreateConclusionModal={setOpenCreateConclusionModal} />
      )}
    </Stack>
  );
}
