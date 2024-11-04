import { PageHeader } from '@component/PageHeader/PageHeader';
import { Button, Checkbox, Divider, Group, MultiSelect, Paper, Select, SimpleGrid, Stack, Switch, Text, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconChevronLeft, IconChevronRight, IconInfoCircle, IconSettings, IconUser } from '@tabler/icons-react';
import { SchemaUtils } from '@util/SchemaUtils';
import React from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
const formSchema = z.object({
  username: z.string().min(1, SchemaUtils.message.nonempty),
  name: z.string().min(1, SchemaUtils.message.nonempty),
  email: z.string().email(SchemaUtils.message.invalidEmail),
  role: z.string().min(1, SchemaUtils.message.nonempty),
  groups: z.string().array().min(1, SchemaUtils.message.nonempty),
  status: z.union([z.literal(1), z.literal(0)]),
});

type FormValues = z.infer<typeof formSchema>;
const initialFormValues: FormValues = {
  username: '',
  name: '',
  email: '',
  role: '',
  groups: [],
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

const AccountCreatePage = () => {
  const form = useForm({
    initialValues: initialFormValues,
    validate: zodResolver(formSchema),
  });
  const handleSubmit = form.onSubmit((formValues) => {});

  return (
    <Stack my='1rem' mx='1rem'>
      <PageHeader
        title='Tài khoản'
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
          <Button leftSection={<IconChevronLeft size={'1.125rem'} />} component={Link} to={'/accounts'} variant='default'>
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
            <TextInput placeholder='Nhập tên tài khoản' withAsterisk label='Tên tài khoản' {...form.getInputProps('username')} />
            <TextInput placeholder='Nhập tên' withAsterisk label='Tên chủ tài khoản' {...form.getInputProps('name')} />
            <TextInput placeholder='Nhập địa chỉ email' withAsterisk label='Email' type='email' {...form.getInputProps('email')} />
            <MultiSelect
              withAsterisk
              comboboxProps={{ withinPortal: false }}
              label='Danh sách nhóm'
              data={GROUPS}
              placeholder='Chọn danh sách nhóm'
              {...form.getInputProps('groups')}
              clearable
            />
            <Select
              withAsterisk
              comboboxProps={{ withinPortal: false }}
              label='Vai trò'
              data={['Admin', 'Giáo viên']}
              placeholder='Chọn vai trò'
              {...form.getInputProps('role')}
              clearable
            />
            <Switch label='Kích hoạt tài khoản' fw={500} {...form.getInputProps('status', { type: 'checkbox' })} />
          </Stack>
        </Paper>
        <Paper withBorder shadow='sm' radius={'md'} p='md'>
          <Stack>
            <Group>
              <IconSettings />
              <Text fw={500}>Phân quyền tính năng</Text>
            </Group>
            <Group>
              <Text w={'30%'}>Tổng quan</Text>
              <Checkbox label='Xem' />
            </Group>
            <Group align='flex-start'>
              <Text w={'30%'}>Tài khoản</Text>
              <Group wrap='wrap' w={'60%'}>
                <Checkbox label='Xem danh sách tài khoản' />
                <Checkbox label='Xem danh sách nhóm' />
                <Checkbox label='Thêm' />
                <Checkbox label='Xóa' />
                <Checkbox label='Sửa' />
              </Group>
            </Group>
            <Group align='flex-start'>
              <Text w={'30%'}>Bài kiểm tra</Text>
              <Group wrap='wrap' w={'60%'}>
                <Checkbox label='Xem' />
                <Checkbox label='Thêm' />
                <Checkbox label='Xóa' />
                <Checkbox label='Sửa' />
              </Group>
            </Group>
            <Group align='flex-start'>
              <Text w={'30%'}>Tin tức</Text>
              <Group wrap='wrap' w={'60%'}>
                <Checkbox label='Xem' />
                <Checkbox label='Thêm' />
                <Checkbox label='Xóa' />
                <Checkbox label='Sửa' />
              </Group>
            </Group>
            <Group align='flex-start'>
              <Text w={'30%'}>Chat Bot</Text>
              <Group wrap='wrap' w={'60%'}>
                <Checkbox label='Xem' />
                <Checkbox label='Thêm' />
                <Checkbox label='Xóa' />
                <Checkbox label='Sửa' />
              </Group>
            </Group>
            <Group align='flex-start'>
              <Text w={'30%'}>Từ điển</Text>
              <Group wrap='wrap' w={'60%'}>
                <Checkbox label='Xem' />
                <Checkbox label='Thêm' />
                <Checkbox label='Xóa' />
                <Checkbox label='Sửa' />
              </Group>
            </Group>
          </Stack>
        </Paper>
      </SimpleGrid>
    </Stack>
  );
};

export default AccountCreatePage;
