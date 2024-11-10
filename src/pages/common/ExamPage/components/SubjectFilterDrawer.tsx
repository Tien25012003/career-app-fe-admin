import { SubjectREQ } from '@api/services/subject/subject.request';
import { Button, Drawer, Group, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

type SubjectFilterDrawerProps = {
  opened?: boolean;
  onClose?: () => void;
  onSubmitFilter?: (value: SubjectREQ) => void;
  onResetFilter?: () => void;
};

const formSchema = z.object({
  id: z.string().trim().min(0),
  name: z.string().trim().min(0),
  vnName: z.string().trim().min(0),
});

type FilterFormValues = z.infer<typeof formSchema>;
const initialFormValues: FilterFormValues = {
  id: '',
  name: '',
  vnName: '',
};

export default function SubjectFilterDrawer({ opened = false, onClose, onSubmitFilter, onResetFilter }: SubjectFilterDrawerProps) {
  const form = useForm({
    initialValues: initialFormValues,
    validate: zodResolver(formSchema),
  });

  const handleSubmit = form.onSubmit((formValues) => {
    onSubmitFilter?.(formValues);
    onClose?.();
  });

  return (
    <Drawer opened={opened} onClose={() => onClose?.()} title='Filter' position='right'>
      <Stack className='w-full'>
        <TextInput label='ID' {...form.getInputProps('id')} />
        <TextInput label='Tên biến' {...form.getInputProps('name')} />
        <TextInput label='Tên hiển thị' {...form.getInputProps('vnName')} />

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
