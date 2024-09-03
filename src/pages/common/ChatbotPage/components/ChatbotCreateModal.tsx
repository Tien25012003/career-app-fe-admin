import { Button, Group, Stack, TagsInput, Textarea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { SchemaUtils } from '@util/SchemaUtils';
import { z } from 'zod';

const formSchema = z.object({
  question: z.string().trim().min(1, SchemaUtils.message.nonempty),
  answer: z.string().trim().min(1, SchemaUtils.message.nonempty),
  keywords: z.string().trim().min(1, SchemaUtils.message.nonempty),
});

type FormValues = z.infer<typeof formSchema>;
const initialFormValues: FormValues = {
  question: '',
  answer: '',
  keywords: '',
};

export default function ChatbotCreateModal() {
  const form = useForm({
    initialValues: initialFormValues,
    validate: zodResolver(formSchema),
  });
  const handleSubmit = form.onSubmit((formValues) => {});
  return (
    <Stack data-autofocus>
      <Textarea withAsterisk label='Câu hỏi' autosize minRows={4} data-autofocus {...form.getInputProps('question')} />
      <Textarea withAsterisk label='Câu trả lời' autosize minRows={4} {...form.getInputProps('answer')} />
      {/* <Textarea withAsterisk label='Từ khoá' autosize {...form.getInputProps('keywords')} /> */}
      <TagsInput label='Từ khoá' />
      <Group justify='flex-end'>
        <Button variant='default' onClick={form.reset}>
          Mặc định
        </Button>
        <Button onClick={() => handleSubmit()} disabled={!form.isDirty()}>
          Thêm
        </Button>
      </Group>
    </Stack>
  );
}
