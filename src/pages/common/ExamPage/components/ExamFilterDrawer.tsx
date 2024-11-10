import { ExamREQ } from '@api/services/exam/exam.request';
import { EExamStatus } from '@enum/exam';
import { Button, ComboboxItem, Drawer, Group, Select, Stack, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { IconCalendarMonth } from '@tabler/icons-react';
import { useMemo } from 'react';
import { z } from 'zod';
import { TextExamStatus } from '../utils';

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

  const items = useMemo<ComboboxItem[]>(
    () =>
      Object.values(EExamStatus)
        .filter((item) => item !== EExamStatus.BLOCKED)
        .map((key) => ({
          value: key,
          label: TextExamStatus[key],
        })),
    [],
  );

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
        {/* <TextInput label='Người tạo' {...form.getInputProps('creator')} /> */}
        <Select withAsterisk label='Trạng thái' placeholder='' data={items} {...form.getInputProps('status')} clearable />
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
