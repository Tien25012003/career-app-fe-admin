import React from 'react';
import { useForm, zodResolver } from '@mantine/form';
import {
  Checkbox,
  Group,
  Stack,
  Paper,
  Text,
  TextInput,
  MultiSelect,
  Select,
  Switch,
  SimpleGrid,
  Button,
  Divider,
  PasswordInput,
} from '@mantine/core';
import { z } from 'zod';
import { EFeature } from '@api/services/auth/auth.response';
import { IconChevronLeft, IconChevronRight, IconSettings, IconUser } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { PageHeader } from '@component/PageHeader/PageHeader';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getGroupSelectAPI } from '@api/services/group/group.api';
import { SchemaUtils } from '@util/SchemaUtils';
import { QUERY_KEYS } from 'constants/query-key.constants';
import { TACCOUNT } from '@api/services/account/account.response';
import { AxiosError } from 'axios';
import { NotifyUtils } from '@util/NotificationUtils';
import { BaseResponse } from '@type/response.type';
import { createAccountAPI } from '@api/services/account/account.api';
import { TAccountREQ } from '@api/services/account/account.request';

const formSchema = z.object({
  username: z.string().min(1, SchemaUtils.message.nonempty),
  name: z.string().min(1, SchemaUtils.message.nonempty),
  email: z.string().email(SchemaUtils.message.invalidEmail),
  role: z.string().min(1, SchemaUtils.message.nonempty),
  password: z.string().min(8, SchemaUtils.message.invalidPassword),
  groups: z.string().array().min(1, SchemaUtils.message.nonempty),
  permissions: z.array(
    z.object({
      code: z.string(),
      name: z.string(),
      permission: z.object({
        create: z.boolean(),
        edit: z.boolean(),
        delete: z.boolean(),
        view: z.boolean(),
      }),
    }),
  ),
  status: z.any(),
});

type FormValues = z.infer<typeof formSchema>;

const initialFormValues: FormValues = {
  username: '',
  name: '',
  email: '',
  role: '',
  password: '',
  groups: [],
  permissions: [
    { code: EFeature.DASHBOARD, name: 'Tổng quan', permission: { create: false, edit: false, delete: false, view: false } },
    { code: EFeature.ACCOUNT, name: 'Tài khoản', permission: { create: false, edit: false, delete: false, view: false } },
    { code: EFeature.EXAM_SYSTEM, name: 'Bài kiểm tra', permission: { create: false, edit: false, delete: false, view: false } },
    { code: EFeature.EXAM_CUSTOM, name: 'Bài kiểm tra tự thiết kế', permission: { create: false, edit: false, delete: false, view: false } },
    { code: EFeature.NEWS, name: 'Tin tức', permission: { create: false, edit: false, delete: false, view: false } },
    { code: EFeature.CHATBOT, name: 'Chat bot', permission: { create: false, edit: false, delete: false, view: false } },
    { code: EFeature.LIBRARY, name: 'Từ điển', permission: { create: false, edit: false, delete: false, view: false } },
  ],
  status: 0, // 0: deactive; 1: active
};

const AccountCreatePage = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: initialFormValues,
    validate: zodResolver(formSchema),
  });

  const { data: groupSelect } = useQuery({
    queryKey: [QUERY_KEYS.GROUP.SELECT],
    queryFn: () => getGroupSelectAPI(),
  });
  const { mutate: createAccount, isPending } = useMutation({
    mutationFn: (request: Partial<TAccountREQ>) => createAccountAPI(request),
    onSuccess: () => {
      NotifyUtils.success('Tạo tài khoản mới thành công!');
      form.reset();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      NotifyUtils.error(error.response?.data?.message);
    },
  });
  // Function to handle permission changes
  const handlePermissionChange = (featureCode: string, permissionType: keyof FormValues['permissions'][number]['permission'], checked: boolean) => {
    form.setFieldValue(
      'permissions',
      form.values.permissions.map((item) =>
        item.code === featureCode ? { ...item, permission: { ...item.permission, [permissionType]: checked } } : item,
      ),
    );
  };
  const handleSubmit = form.onSubmit((formValues) => {
    console.log(formValues);
    createAccount({ ...formValues, status: formValues.status ? 1 : 0 });
  });

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
          <Group>
            <Button leftSection={<IconChevronLeft size={'1.125rem'} />} onClick={() => navigate(-1)} variant='default'>
              Trở về
            </Button>
            <Button
              onClick={() => {
                console.log(form.errors, form.getValues());
                handleSubmit();
              }}
              disabled={!form.isDirty()}
              loading={isPending}
            >
              Thêm
            </Button>
          </Group>
        }
      />
      <SimpleGrid cols={2}>
        <Paper withBorder shadow='sm' radius='md' p='md'>
          <Stack>
            <TextInput placeholder='Nhập tên tài khoản' withAsterisk label='Tên tài khoản' {...form.getInputProps('username')} />
            <TextInput placeholder='Nhập tên' withAsterisk label='Tên chủ tài khoản' {...form.getInputProps('name')} />
            <TextInput placeholder='Nhập địa chỉ email' withAsterisk label='Email' type='email' {...form.getInputProps('email')} />
            <PasswordInput placeholder='Nhập mật khẩu' withAsterisk label='Mật khẩu' {...form.getInputProps('password')} />

            <MultiSelect
              withAsterisk
              label='Danh sách nhóm'
              data={groupSelect?.data?.map((group) => ({ label: group.groupName, value: group._id }))}
              placeholder='Chọn danh sách nhóm'
              {...form.getInputProps('groups')}
              clearable
            />
            <Select
              withAsterisk
              label='Vai trò'
              data={[
                { label: 'Admin', value: 'ADMIN' },
                { label: 'Giáo viên', value: 'TEACHER' },
                { label: 'Học sinh', value: 'STUDENT' },
              ]}
              placeholder='Chọn vai trò'
              {...form.getInputProps('role')}
              clearable
            />
            <Switch label='Kích hoạt tài khoản' {...form.getInputProps('status', { type: 'checkbox' })} />
          </Stack>
        </Paper>

        <Paper withBorder shadow='sm' radius='md' p='md'>
          <Stack>
            <Text fw={500}>Phân quyền tính năng</Text>
            {form.values.permissions.map((feature) => (
              <Stack key={feature.code}>
                <Text fw={500}>{feature.name}</Text>
                <Group>
                  <Checkbox
                    label='Xem'
                    checked={feature.permission.view}
                    onChange={(e) => handlePermissionChange(feature.code, 'view', e.currentTarget.checked)}
                  />
                  <Checkbox
                    label='Thêm'
                    checked={feature.permission.create}
                    onChange={(e) => handlePermissionChange(feature.code, 'create', e.currentTarget.checked)}
                  />
                  <Checkbox
                    label='Sửa'
                    checked={feature.permission.edit}
                    onChange={(e) => handlePermissionChange(feature.code, 'edit', e.currentTarget.checked)}
                  />
                  <Checkbox
                    label='Xóa'
                    checked={feature.permission.delete}
                    onChange={(e) => handlePermissionChange(feature.code, 'delete', e.currentTarget.checked)}
                  />
                </Group>
              </Stack>
            ))}
          </Stack>
        </Paper>
      </SimpleGrid>
    </Stack>
  );
};

export default AccountCreatePage;
