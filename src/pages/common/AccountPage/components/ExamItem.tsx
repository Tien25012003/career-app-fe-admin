import { ExamRESP } from '@api/services/exam/exam.response';
import { ActionIcon, Group, Paper, Stack, Text } from '@mantine/core';
import { IconBook, IconEye, IconTrash } from '@tabler/icons-react';
import { DateUtils } from '@util/DateUtils';

import { ROUTES } from 'constants/routes.constants';
import { useNavigate } from 'react-router-dom';

type TMemberItem = {
  exam: ExamRESP;
  onClick?: (exam: ExamRESP) => void;
  onRemoveClick?: () => void;
};
const ExamItem = ({ exam, onClick, onRemoveClick }: TMemberItem) => {
  const navigate = useNavigate();

  return (
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
          <ActionIcon bg='red' onClick={onRemoveClick}>
            <IconTrash size={'1.125rem'} />
          </ActionIcon>
        </Group>
      </Group>
    </Paper>
  );
};

export default ExamItem;
