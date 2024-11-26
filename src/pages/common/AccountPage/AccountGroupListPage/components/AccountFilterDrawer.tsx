import { GroupREQ } from '@api/services/group/group.request';
import { Button, Drawer, Group, Select, Stack, Switch, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

type FilterDrawerProps = {
  opened?: boolean;
  onClose?: () => void;
  onSubmitFilter?: (value: Partial<GroupREQ>) => void;
  onResetFilter?: () => void;
};
const formSchema = z.object({
  email: z.string(),
  name: z.string(),
  role: z.string(),
  status: z.boolean(),
  direction: z.boolean(),
});

type FilterFormValues = z.infer<typeof formSchema>;
const initialFormValues: FilterFormValues = {
  name: '',
  direction: false,
  email: '',
  role: '',
  status: false,
};
export default function AccountFilterDrawer({ opened = false, onClose, onSubmitFilter, onResetFilter }: FilterDrawerProps) {
  const form = useForm({
    initialValues: initialFormValues,
    validate: zodResolver(formSchema),
  });

  // METHODS
  const handleSubmit = form.onSubmit((formValues) => {
    onSubmitFilter?.({
      ...formValues,
      status: formValues.status ? 1 : 0,
      direction: formValues.direction ? 1 : 0,
    });
    onClose?.();
  });
  return (
    <Drawer opened={opened} onClose={() => onClose?.()} title='Lọc dữ liệu' position='right'>
      <Stack className='w-full'>
        <TextInput label='Tên chủ tài khoản' {...form.getInputProps('groupName')} data-autofocus />
        <TextInput label='Email' {...form.getInputProps('email')} data-autofocus />
        <Select
          data={[
            {
              label: 'Admin',
              value: 'ADMIN',
            },
            {
              label: 'Giáo viên',
              value: 'TEACHER',
            },
            {
              label: 'Học sinh',
              value: 'STUDENT',
            },
            {
              label: 'Không xác định',
              value: 'ANONYMOUS',
            },
          ]}
          label='Chọn vai trò'
          {...form.getInputProps('role')}
          data-autofocus
        />

        <Switch label='Trạng thái' {...form.getInputProps('status', { type: 'checkbox' })} />
        <Switch label='Sắp xếp tăng dần?' {...form.getInputProps('direction', { type: 'checkbox' })} />

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
