import { PageHeader } from '@component/PageHeader/PageHeader';
import { Button, Group, Stack } from '@mantine/core';
import { IconFileUpload, IconPencil, IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Conclusion } from './components/Conclusion';
import ExamManagement from './components/ExamManagement';
import { SchoolScore } from './components/SchoolScore';

type THeader = {
  name: 'HOLLAND_IQ_EQ' | 'SchoolScore' | 'Conclusion';
  label: string;
  link?: string;
};

const HEADERS: THeader[] = [
  {
    name: 'HOLLAND_IQ_EQ',
    label: 'Holland - IQ - EQ',
    link: '/exams/system',
  },
  {
    name: 'SchoolScore',
    label: 'Điểm học bạ',
    link: '/subjects',
  },
  // {
  //   name: 'Conclusion',
  //   label: 'Kết luận',
  // },
];

export default function SystemExam() {
  const [openCreateExamModal, setOpenCreateExamModal] = useState(false);
  const [selectedHeader, setSelectedHeader] = useState(HEADERS[0].name);
  const [openCreateSubjectModal, setOpenCreateSubjectModal] = useState(false);
  const [openCreateConclusionModal, setOpenCreateConclusionModal] = useState(false);

  const navigate = useNavigate();

  // EFFECTS
  useEffect(() => {
    setSelectedHeader('HOLLAND_IQ_EQ');
    navigate('/exams/system');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                setOpenCreateExamModal(true);
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
            <Button
              key={index}
              variant={selectedHeader === header.name ? 'filled' : 'outline'}
              onClick={() => {
                setSelectedHeader(header.name);
                navigate(header.link as string, { replace: true });
              }}
            >
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
        <ExamManagement openCreateExamModal={openCreateExamModal} setOpenCreateExamModal={setOpenCreateExamModal} />
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
