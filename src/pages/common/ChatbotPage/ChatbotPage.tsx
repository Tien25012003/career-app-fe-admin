import AppSearch from '@component/AppSearch/AppSearch';
import AppTable from '@component/AppTable/AppTable';
import { PageHeader } from '@component/PageHeader/PageHeader';
import { TableButton } from '@component/TableButton/TableButton';
import { Button, Modal, Stack } from '@mantine/core';
import { IconBrandWechat, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { ChatbotCreateModal } from './components';

const chatbotDummyData = [
  {
    id: 1,
    question: 'Career App là gì?',
    answer: 'Career App là phần mềm hướng nghiệp cho học sinh THPT',
    keywords: 'Career App, tên, chức năng',
  },
  {
    id: 2,
    question: 'Career App là gì?',
    answer: 'Career App là phần mềm hướng nghiệp cho học sinh THPT',
    keywords: 'Career App, tên, chức năng',
  },
  {
    id: 3,
    question: 'Career App là gì?',
    answer: 'Career App là phần mềm hướng nghiệp cho học sinh THPT',
    keywords: 'Career App, tên, chức năng',
  },
  {
    id: 4,
    question: 'Career App là gì?',
    answer: 'Career App là phần mềm hướng nghiệp cho học sinh THPT',
    keywords: 'Career App, tên, chức năng',
  },
  {
    id: 5,
    question: 'Career App là gì?',
    answer: 'Career App là phần mềm hướng nghiệp cho học sinh THPT',
    keywords: 'Career App, tên, chức năng',
  },
];

export default function ChatbotPage() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  return (
    <Stack my='1rem' mx='1rem'>
      <PageHeader
        title='Chat bot'
        leftSection={<IconBrandWechat />}
        rightSection={
          <Button leftSection={<IconPlus size={'1.125rem'} />} onClick={() => setOpenCreateModal(true)}>
            Thêm mới
          </Button>
        }
      />
      <AppSearch />
      <AppTable
        data={chatbotDummyData}
        columns={[
          {
            accessor: 'id',
            title: 'ID',
            width: 50,
            textAlign: 'center',
          },
          {
            accessor: 'question',
            title: 'Câu hỏi',
          },
          {
            accessor: 'answer',
            title: 'Câu trả lời',
          },
          {
            accessor: 'keywords',
            title: 'Từ khoá',
          },
          {
            accessor: 'actions',
            title: 'Thao tác',
            textAlign: 'center',
            render: () => <TableButton onView={() => {}} onEdit={() => {}} onDelete={() => {}} />,
          },
        ]}
      />
      <Modal
        opened={openCreateModal}
        onClose={() => setOpenCreateModal(!openCreateModal)}
        centered
        size={'lg'}
        title='Thêm mới câu hỏi'
        styles={{
          title: {
            fontWeight: 500,
          },
        }}
      >
        <ChatbotCreateModal />
      </Modal>
    </Stack>
  );
}
