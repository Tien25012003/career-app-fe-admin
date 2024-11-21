import { queryClient } from '@api/config/queryClient';
import { addPromptInGroupAPI, getPromptSelectAPI } from '@api/services/chat-bot/chat-bot.api';
import { getGroupSelectAPI } from '@api/services/group/group.api';
import { Button, Divider, Group, Modal, Select, Stack, Text } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { NotifyUtils } from '@util/NotificationUtils';
import { SchemaUtils } from '@util/SchemaUtils';
import { AxiosError } from 'axios';
import { QUERY_KEYS } from 'constants/query-key.constants';
import { useMemo } from 'react';
import { z } from 'zod';

type TExamInGroupProps = {
  groupId: string;
  opened: boolean;
  onClose: () => void;
};
type FormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  groupId: z.string().min(1, SchemaUtils.message.nonempty),
  promptId: z.string().min(1, SchemaUtils.message.nonempty),
});
const ChatbotInGroupModal = ({ opened, onClose, groupId }: TExamInGroupProps) => {
  const { data: groupSelect } = useQuery({
    queryKey: [QUERY_KEYS.GROUP.SELECT],
    queryFn: () => getGroupSelectAPI(),
  });
  const { data: chatbots, isFetching: isFetchingChatBots } = useQuery({
    queryKey: [QUERY_KEYS.CHAT_BOT.LIST],
    queryFn: () => getPromptSelectAPI(),
  });

  const initialFormValues: FormValues = useMemo(
    () => ({
      groupId: groupId,
      promptId: '',
    }),
    [groupId],
  );
  const { mutate: addPromptToGroup, isPending: isPendingAdd } = useMutation({
    mutationFn: (value: { groupId: string; promptId: string }) => addPromptInGroupAPI(value),
    onSuccess: () => {
      NotifyUtils.success('Thêm prompt thành công!');
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP.CHATBOT_IN_GROUP, { groupdId: groupId }],
      });
      form.reset();

      onClose();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      NotifyUtils.error(error.response?.data?.message);
    },
  });

  const form = useForm({
    initialValues: initialFormValues,
    validate: zodResolver(formSchema),
  });
  const onAddExamToGroup = form.onSubmit((values) => {
    addPromptToGroup(values);
  });
  return (
    <Modal opened={opened} onClose={onClose} title={<Text fw={'bold'}>Nhập thông tin</Text>}>
      <Stack>
        <Select
          disabled
          label='Chọn nhóm'
          placeholder='Chọn nhóm'
          data={groupSelect?.data?.map((group) => ({ label: group.groupName, value: group._id }))}
          {...form.getInputProps('groupId')}
        />
        <Select
          label='Chọn nội dung chatbot'
          placeholder='Chọn nội dung chatbot'
          data={chatbots?.data?.map((chatbot) => ({ label: chatbot.question, value: chatbot._id }))}
          {...form.getInputProps('promptId')}
        />
        <Divider />
        <Group justify='flex-end'>
          <Button variant='default' onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={() => onAddExamToGroup()} loading={isPendingAdd} disabled={!form.isDirty()}>
            Xác nhận
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default ChatbotInGroupModal;
