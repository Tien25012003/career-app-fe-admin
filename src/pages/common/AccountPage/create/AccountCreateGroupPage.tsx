import { PageHeader } from '@component/PageHeader/PageHeader';
import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  Group,
  MultiSelect,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import {
  IconChevronLeft,
  IconChevronRight,
  IconInfoCircle,
  IconSearch,
  IconSettings,
  IconUser,
  IconUsersGroup,
} from '@tabler/icons-react';
import { SchemaUtils } from '@util/SchemaUtils';
import React from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
const formSchema = z.object({
  groupName: z.string().min(1, SchemaUtils.message.nonempty),
  owner: z.string().min(1, SchemaUtils.message.nonempty),
  status: z.union([z.literal(1), z.literal(0)]),
});

type FormValues = z.infer<typeof formSchema>;
const initialFormValues: FormValues = {
  groupName: '',
  owner: '',
  status: 0, //0: deactive ; 1: active
};

const GROUPS = [
  {
    label: 'Group A',
    value: 'A',
  },
  {
    label: 'Group B',
    value: 'B',
  },
];

const AccountCreateGroupPage = () => {
  const form = useForm({
    initialValues: initialFormValues,
    validate: zodResolver(formSchema),
  });
  const handleSubmit = form.onSubmit((formValues) => {});

  return (
    <Stack my='1rem' mx='1rem'>
      <PageHeader
        title='Nhóm'
        leftSection={<IconUser />}
        middleSection={
          <>
            <IconChevronRight size={'20'} />
            <Text size='xl' fw={500}>
              Thêm mới
            </Text>
          </>
        }
        rightSection={
          <Button
            leftSection={<IconChevronLeft size={'1.125rem'} />}
            component={Link}
            to={'/accounts'}
            variant='default'
          >
            Trở về
          </Button>
        }
      />
      <SimpleGrid cols={2}>
        <Paper withBorder shadow='sm' radius={'md'} p='md'>
          <Stack>
            <Group>
              <IconInfoCircle />
              <Text fw={500}>Thông tin chung</Text>
            </Group>
            <TextInput
              placeholder='Nhập tên nhóm'
              withAsterisk
              label='Tên nhóm'
              {...form.getInputProps('groupName')}
            />
            <Select
              withAsterisk
              comboboxProps={{ withinPortal: false }}
              label='Chọn tài khoản'
              data={['Đoàn Tấn Khang', 'Nguyễn Thị Phương Tiên']}
              placeholder='Chọn tài khoản'
              {...form.getInputProps('owner')}
              clearable
              searchable
            />
            <Switch
              label='Kích hoạt tài khoản'
              fw={500}
              {...form.getInputProps('status', { type: 'checkbox' })}
            />
          </Stack>
        </Paper>
        <Paper withBorder shadow='sm' radius={'md'} p='md'>
          <Stack>
            <Group>
              <IconUsersGroup />
              <Text fw={500}>Chọn thành viên</Text>
            </Group>
            <Group>
              <TextInput
                flex={1}
                placeholder='Nhập tên thành viên'
                leftSection={<IconSearch size={'1.125rem'} />}
                {...form.getInputProps('groupName')}
              />
              <Button>Tìm kiếm</Button>
            </Group>
            <Group gap={'xs'}>
              <Avatar.Group>
                {GROUPS.slice(0, 4).map((group) => (
                  <Avatar key={Math.random()} name={group.label} color='initials' />
                ))}
                {GROUPS.length > 5 && (
                  <Avatar key={Math.random()} name={`+${GROUPS.length - 4}`} color='gray'></Avatar>
                )}
              </Avatar.Group>
            </Group>
          </Stack>
        </Paper>
      </SimpleGrid>
    </Stack>
  );
};

export default AccountCreateGroupPage;
