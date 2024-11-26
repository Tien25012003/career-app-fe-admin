import { ChatBotREQ } from '@api/services/chat-bot/chat-bot.request';
import { Button, Drawer, Group, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

type ChatbotFilterDrawerProps = {
  opened?: boolean;
  onClose?: () => void;
  onSubmitFilter?: (value: ChatBotREQ) => void;
  onResetFilter?: () => void;
};
const formSchema = z.object({
  question: z.string().trim().min(0),
  answer: z.string().trim().min(0),
  keywords: z.string().trim().min(0),
});

type FilterFormValues = z.infer<typeof formSchema>;
const initialFormValues: FilterFormValues = {
  question: '',
  answer: '',
  keywords: '',
};
export default function ChatbotFilterDrawer({ opened = false, onClose, onSubmitFilter, onResetFilter }: ChatbotFilterDrawerProps) {
  const form = useForm({
    initialValues: initialFormValues,
    validate: zodResolver(formSchema),
  });

  // METHODS
  const handleSubmit = form.onSubmit((formValues) => {
    onSubmitFilter?.(formValues);
    onClose?.();
  });
  return (
    <Drawer opened={opened} onClose={() => onClose?.()} title='Filter' position='right'>
      <Stack className='w-full'>
        <TextInput label='Câu hỏi' {...form.getInputProps('question')} data-autofocus />
        <TextInput label='Câu trả lời' {...form.getInputProps('answer')} />
        <TextInput label='Từ khoá' {...form.getInputProps('keywords')} />

        <Group justify='space-between' className='flex-nowrap mt-4'>
          <Button
            variant='default'
            className='w-full'
            onClick={() => {
              onResetFilter?.();
              form.reset();
            }}
          >
            Reset
          </Button>
          <Button className='w-full' onClick={() => handleSubmit()}>
            Lọc
          </Button>
        </Group>
      </Stack>
    </Drawer>
  );
}
