import { ExamRESP } from '@api/services/exam/exam.response';
import { ActionIcon, Group, Paper, Stack, Text, Tooltip } from '@mantine/core';
import { IconBook, IconEye, IconReport, IconTrash } from '@tabler/icons-react';
import { DateUtils } from '@util/DateUtils';

import { useDisclosure } from '@mantine/hooks';
import { ROUTES } from 'constants/routes.constants';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DoExamDrawer from './DoExamDrawer';

type TMemberItem = {
  exam: ExamRESP;
  onClick?: (exam: ExamRESP) => void;
  onRemoveClick?: () => void;
};
const ExamItem = ({ exam, onClick, onRemoveClick }: TMemberItem) => {
  const navigate = useNavigate();

  const [openedDoExamModal, { open: openDoExamModal, close: closeDoExamModal }] = useDisclosure(false);

  return (
    <React.Fragment>
      <Paper withBorder py={'md'} px={'lg'} onClick={() => onClick?.(exam)}>
        <Group justify='space-between' flex={1}>
          <Group>
            <IconBook />
            <Stack gap={'0.5rem'}>
              <Text size='1rem' fw={500}>
                {exam.name}
              </Text>
              <Text size='1rem' c={'gray'}>
                {exam.category}
              </Text>
              <Text size='1rem' c={'gray'}>
                {exam?.createdAt && DateUtils.fDate(exam.createdAt)}
              </Text>
            </Stack>
          </Group>
          <Group gap={5}>
            <ActionIcon variant='outline' onClick={() => navigate(`${ROUTES.EXAMS.SYSTEM}/${exam._id}/${exam.category}`)}>
              <IconEye size={'1.125rem'} />
            </ActionIcon>
            <Tooltip label='Kết quả bài kiểm tra' withArrow>
              <ActionIcon>
                <IconReport size={'1.125rem'} onClick={() => openDoExamModal()} />
              </ActionIcon>
            </Tooltip>
            <ActionIcon bg='red' onClick={onRemoveClick}>
              <IconTrash size={'1.125rem'} />
            </ActionIcon>
          </Group>
        </Group>
      </Paper>
      <DoExamDrawer opened={openedDoExamModal} onClose={closeDoExamModal} title={exam?.name} examId={exam?._id} />
    </React.Fragment>
  );
};

export default ExamItem;
