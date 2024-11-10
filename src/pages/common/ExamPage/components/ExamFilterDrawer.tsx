import { ExamREQ } from '@api/services/exam/exam.request';
import { EExamStatus } from '@enum/exam';
import { Button, Drawer, Group, Stack, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { IconCalendarMonth } from '@tabler/icons-react';
import { z } from 'zod';

type ExamFilterDrawerProps = {
  opened?: boolean;
  onClose?: () => void;
  onSubmitFilter?: (value: ExamREQ) => void;
  onResetFilter?: () => void;
};

const formSchema = z.object({
  id: z.string().trim().min(0),
  name: z.string().trim().min(0),
  status: z.string().trim().min(0),
  creator: z.string().trim().min(0),
  createdAt: z.array(z.date()),
});

type FilterFormValues = z.infer<typeof formSchema>;
const initialFormValues: FilterFormValues = {
  id: '',
  name: '',
  status: '',
  creator: '',
  createdAt: [],
};

export default function ExamFilterDrawer({ opened = false, onClose, onSubmitFilter, onResetFilter }: ExamFilterDrawerProps) {
  const form = useForm({
    initialValues: initialFormValues,
    validate: zodResolver(formSchema),
  });

  // METHODS
  const handleSubmit = form.onSubmit((formValues) => {
    // console.log('formValues', new Date(formValues.createdAt[0]).getTime());
    onSubmitFilter?.({
      id: formValues.id,
      name: formValues.name,
      creator: formValues.creator,
      status: (formValues?.status as EExamStatus) || null,
      startDate: new Date(formValues.createdAt[0]).getTime(),
      endDate: new Date(formValues.createdAt[1]).getTime(),
    });
    onClose?.();
  });
  return (
    <Drawer opened={opened} onClose={() => onClose?.()} title='Filter' position='right'>
      <Stack className='w-full'>
        <TextInput label='ID' {...form.getInputProps('id')} data-autofocus />
        <TextInput label='Tên bài kiểm tra' {...form.getInputProps('name')} />
        <TextInput label='Người tạo' {...form.getInputProps('creator')} />
        <DatePickerInput
          placeholder='Ngày tạo'
          label='Ngày tạo'
          leftSection={<IconCalendarMonth size='1rem' />}
          locale='vi'
          valueFormat='DD/MM/YYYY'
          className='w-full'
          type='range'
          {...form.getInputProps('createdAt')}
        />
        <Group justify='space-between' className='flex-nowrap mt-4'>
          <Button
            variant='default'
            className='w-full'
            onClick={() => {
              onResetFilter?.();
              form.reset();
              onClose?.();
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
