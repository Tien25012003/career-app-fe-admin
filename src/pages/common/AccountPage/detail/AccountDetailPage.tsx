import { getAccount } from '@api/services/account/account.api';
import { PageHeader } from '@component/PageHeader/PageHeader';
import {
  Button,
  Checkbox,
  Divider,
  Group,
  LoadingOverlay,
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
import { IconChevronLeft, IconChevronRight, IconInfoCircle, IconSettings, IconUser } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { SchemaUtils } from '@util/SchemaUtils';
import { QUERY_KEYS } from 'constants/query-key.constants';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { z } from 'zod';
const formSchema = z.object({
  username: z.string().min(1, SchemaUtils.message.nonempty),
  name: z.string().min(1, SchemaUtils.message.nonempty),
  email: z.string().email(SchemaUtils.message.invalidEmail),
  role: z.string().min(1, SchemaUtils.message.nonempty),
  groups: z.string().array().min(1, SchemaUtils.message.nonempty),
  permissions: z
    .object({
      code: z.string(),
      name: z.string(),
      permission: z.object({
        create: z.boolean(),
        edit: z.boolean(),
        delete: z.boolean(),
        view: z.boolean(),
      }),
    })
    .array(),
  status: z.number().default(0),
});

type FormValues = z.infer<typeof formSchema>;

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

const AccountForm = (value: FormValues) => {
  const form = useForm({
    initialValues: value,
    validate: zodResolver(formSchema),
  });
  const handleSubmit = form.onSubmit((formValues) => {});

  return (
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

          {form.getValues().permissions?.map((permission, index) => (
            <Group align='flex-start' key={index}>
              <Text w={'30%'}>{permission.name}</Text>
              <Group wrap='wrap' w={'60%'}>
                <Checkbox label='Xem' checked={permission.permission.view} />
                <Checkbox label='Thêm' checked={permission.permission.create} />
                <Checkbox label='Xóa' checked={permission.permission.delete} />
                <Checkbox label='Sửa' checked={permission.permission.edit} />
              </Group>
            </Group>
          ))}
        </Stack>
      </Paper>
    </SimpleGrid>
  );
};

const AccountDetailPage = () => {
  const { id } = useParams();

  const { data: account, isFetching: isFetchingAccount } = useQuery({
    queryKey: [QUERY_KEYS.ACCOUNT.LIST, id],
    queryFn: () => getAccount({ userId: id! }),
  });
  console.log(id);
  return (
    <Stack my='1rem' mx='1rem'>
      <LoadingOverlay visible={isFetchingAccount} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
      <PageHeader
        title='Từ điển'
        leftSection={<IconUser />}
        middleSection={
          <>
            <IconChevronRight size={'20'} />
            <Text size='xl' fw={500}>
              Chi tiết
            </Text>
          </>
        }
        rightSection={
          <Button leftSection={<IconChevronLeft size={'1.125rem'} />} component={Link} to={'/accounts'} variant='default'>
            Trở về
          </Button>
        }
      />
      {!isFetchingAccount && account?.data && (
        <AccountForm
          email={account.data.email}
          groups={account.data.groups || []}
          name={account.data.name || ''}
          role={account.data.role || ''}
          status={account.data.status || 0}
          username={account.data.username || ''}
          permissions={account.data.permissions || []}
        />
      )}
    </Stack>
  );
};

export default AccountDetailPage;
