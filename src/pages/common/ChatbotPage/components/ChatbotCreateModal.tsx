import { addPromptAPI } from '@api/services/chat-bot/chat-bot.api';
import { AddPromptREQ } from '@api/services/chat-bot/request/chat-bot.request';
import { onError } from '@helper/error.helpers';
import { Button, Group, Stack, TagsInput, Textarea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { NotifyUtils } from '@util/NotificationUtils';
import { SchemaUtils } from '@util/SchemaUtils';
import { QUERY_KEYS } from 'constants/query-key.constants';
import useInvalidate from 'hooks/useInvalidate';
import { z } from 'zod';

const formSchema = z.object({
  question: z.string().trim().min(1, SchemaUtils.message.nonempty),
  answer: z.string().trim().min(1, SchemaUtils.message.nonempty),
  keywords: z.array(z.string()),
});

type FormValues = z.infer<typeof formSchema>;
const initialFormValues: FormValues = {
  question: '',
  answer: '',
  keywords: [],
};

export default function ChatbotCreateModal() {
  const form = useForm({
    initialValues: initialFormValues,
    validate: zodResolver(formSchema),
  });

  const invalidate = useInvalidate();

  // APIS
  const { mutate: addPromptMutation, isPending } = useMutation({
    mutationFn: (request: AddPromptREQ) => addPromptAPI(request),
    onSuccess: () => {
      invalidate({
        queryKey: [QUERY_KEYS.CHAT_BOT.LIST],
      });
      NotifyUtils.success('Tạo mới câu hỏi chat bot thành công!');
    },
    onError,
  });

  const handleSubmit = form.onSubmit((formValues) => {
    addPromptMutation({ ...formValues, keywords: formValues?.keywords?.join(',') });
  });

  return (
    <Stack data-autofocus>
      <form onSubmit={handleSubmit}>
        <Textarea withAsterisk label='Câu hỏi' autosize minRows={4} data-autofocus {...form.getInputProps('question')} />
        <Textarea withAsterisk label='Câu trả lời' autosize minRows={4} {...form.getInputProps('answer')} />
        {/* <Textarea withAsterisk label='Từ khoá' autosize {...form.getInputProps('keywords')} /> */}
        <TagsInput label='Từ khoá' value={form.values.keywords} onChange={(value) => form.setFieldValue('keywords', value)} />
      </form>
      <Group justify='flex-end'>
        <Button variant='default' onClick={form.reset}>
          Mặc định
        </Button>
        <Button onClick={() => handleSubmit()} disabled={!form.isDirty()} loading={isPending}>
          Thêm
        </Button>
      </Group>
    </Stack>
  );
}
