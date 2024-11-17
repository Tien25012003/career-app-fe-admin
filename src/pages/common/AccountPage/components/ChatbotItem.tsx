import { TAccountName } from '@api/services/account/account.request';
import { ChatBotRESP } from '@api/services/chat-bot/chat-bot.response';
import { ActionIcon, Avatar, Group, Paper, Stack, Text } from '@mantine/core';
import { IconChecks, IconDatabase, IconEye, IconTrash } from '@tabler/icons-react';
import { DateUtils } from '@util/DateUtils';
import { ROUTES } from 'constants/routes.constants';
import { useNavigate } from 'react-router-dom';

type TChatbotItem = {
  chatbot: Pick<ChatBotRESP, '_id' | 'question' | 'createdAt'>;
  onClick?: (member: Pick<ChatBotRESP, '_id' | 'question' | 'createdAt'>) => void;
  onRemoveClick: () => void;
};
const ChatbotItem = ({ chatbot, onClick, onRemoveClick }: TChatbotItem) => {
  const navigate = useNavigate();
  return (
    <Paper withBorder py={'md'} px={'lg'} onClick={() => onClick?.(chatbot)}>
      <Group justify='space-between' flex={1}>
        <Group>
          <IconDatabase />
          <Stack gap={'0.5rem'}>
            <Text size='1rem' fw={500}>
              {chatbot.question}
            </Text>
            <Text size='1rem' c={'gray'}>
              {DateUtils.fDate(new Date(chatbot.createdAt))}
            </Text>
          </Stack>
        </Group>
        <Group gap={5}>
          <ActionIcon variant='outline' onClick={() => navigate(`${ROUTES.EXAMS.SYSTEM}/${chatbot._id}`)}>
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

export default ChatbotItem;
