import { addPromptAPI, editPromptAPI, getPromptDetailAPI } from '@api/services/chat-bot/chat-bot.api';
import { AddPromptREQ, EditPromptREQ } from '@api/services/chat-bot/chat-bot.request';
import { onError } from '@helper/error.helpers';
import { Button, Group, Loader, LoadingOverlay, Modal, Stack, TagsInput, Textarea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { NotifyUtils } from '@util/NotificationUtils';
import { SchemaUtils } from '@util/SchemaUtils';
import { QUERY_KEYS } from 'constants/query-key.constants';
import useInvalidate from 'hooks/useInvalidate';
import { useEffect } from 'react';
import { z } from 'zod';

const formSchema = z.object({
  question: z.string().trim().min(1, SchemaUtils.message.nonempty),
  answer: z.string().trim().min(1, SchemaUtils.message.nonempty),
  keywords: z.array(z.string()),
});

type ChatbotFormValues = z.infer<typeof formSchema>;
const initialFormValues: ChatbotFormValues = {
  question: '',
  answer: '',
  keywords: [],
};

type ChatbotCreateModalProps = {
  open: boolean;
  onClose: () => void;
  selectedId?: string | null;
};

export default function ChatbotCreateModal({ open, onClose, selectedId }: ChatbotCreateModalProps) {
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
      onClose();
      form.reset();
    },
    onError,
  });

  const { data: promptDetail, isFetching: isFetchingDetail } = useQuery({
    queryKey: [QUERY_KEYS.CHAT_BOT.LIST, selectedId],
    queryFn: () => getPromptDetailAPI(selectedId as string),
    enabled: !!selectedId,
    select: ({ data }) => data,
  });

  const { mutate: editPromptMutation, isPending: isEditing } = useMutation({
    mutationFn: (request: EditPromptREQ) => editPromptAPI(selectedId as string, request),
    onSuccess: () => {
      invalidate({
        queryKey: [QUERY_KEYS.CHAT_BOT.LIST],
      });
      NotifyUtils.success('Sửa câu hỏi chat bot thành công!');
      onClose();
      form.reset();
    },
    onError,
  });

  // METHODS
  const handleSubmit = form.onSubmit((formValues) => {
    const request: AddPromptREQ | EditPromptREQ = { ...formValues, keywords: formValues?.keywords?.join(',') };
    if (!selectedId) {
      addPromptMutation(request);
    } else {
      editPromptMutation(request);
    }
  });

  const handleClose = () => {
    onClose?.();
    form.reset();
  };

  // EFFECTS
  useEffect(() => {
    if (!open) return;
    if (selectedId) {
      form.setValues({ ...promptDetail, keywords: promptDetail?.keywords?.split(',') });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, open, promptDetail]);

  return (
    <Modal
      opened={open}
      onClose={handleClose}
      centered
      size={'lg'}
      title='Thêm mới câu hỏi'
      styles={{
        title: {
          fontWeight: 500,
        },
      }}
    >
      <LoadingOverlay visible={isFetchingDetail} loaderProps={{ children: <Loader /> }} />
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
          <Button onClick={() => handleSubmit()} disabled={!form.isDirty()} loading={isPending || isEditing}>
            {!selectedId ? `Thêm` : `Sửa`}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
