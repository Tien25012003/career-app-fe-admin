import AppSearch from '@component/AppSearch/AppSearch';
import AppTable from '@component/AppTable/AppTable';
import { PageHeader } from '@component/PageHeader/PageHeader';
import { Badge, Button, Group, Modal, Radio, Stack, Text } from '@mantine/core';
import { IconPencil, IconPlus } from '@tabler/icons-react';
import { examDummmyData } from './dummyData';
import { ColorExamStatus, TextExamStatus, TextExamType } from './utils';
import { EExamStatus, EQuestionType } from '@interface/exam';
import { DATETIME_FORMAT, DateUtils } from '@util/DateUtils';
import { TableButton } from '@component/TableButton/TableButton';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function ExamPage() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [questionType, setQuestionType] = useState<EQuestionType>(EQuestionType.MULTIPLE_CHOICE);
  return (
    <Stack my='1rem' mx='1rem'>
      <PageHeader
        title='Quản lý bài kiểm tra'
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
            accessor: 'questionType',
            title: 'Thể loại',
            textAlign: 'center',
            width: 200,
            render: (val) => <Text size='sm'>{TextExamType[val.questionType as EQuestionType]}</Text>,
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
      <Modal
        opened={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        centered
        size={'md'}
        title='Vui lòng chọn loại kiểm tra'
        styles={{
          title: {
            fontWeight: 500,
          },
        }}
      >
        <Stack>
          <Radio.Group withAsterisk label='Thể loại' value={questionType} onChange={(value) => setQuestionType(value as EQuestionType)}>
            <Group mt='xs'>
              {Object.keys(EQuestionType)?.map((item, index) => (
                <Radio value={item} label={TextExamType[item as EQuestionType]} key={index} />
              ))}
            </Group>
          </Radio.Group>
          <Group justify='flex-end'>
            <Button variant='default' onClick={() => setOpenCreateModal(false)}>
              Huỷ
            </Button>
            <Button component={Link} to={`create/${questionType}`}>
              Thêm
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
}
