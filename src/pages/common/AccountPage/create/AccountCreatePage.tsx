import { createAccountWithTokenAPI } from '@api/services/account/account.api';
import { TAccountREQ } from '@api/services/account/account.request';
import { EFeature } from '@api/services/auth/auth.response';
import { getGroupSelectAPI } from '@api/services/group/group.api';
import AppFallBack from '@component/AppFallBack/AppFallBack';
import { PageHeader } from '@component/PageHeader/PageHeader';
import { EROLE } from '@enum/account.enum';
import { Button, Checkbox, Group, MultiSelect, Paper, PasswordInput, Select, SimpleGrid, Stack, Switch, Text, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconChevronLeft, IconChevronRight, IconUser } from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { NotifyUtils } from '@util/NotificationUtils';
import { SchemaUtils } from '@util/SchemaUtils';
import { userInfoAtom } from 'atoms/auth.store';
import { AxiosError } from 'axios';
import { QUERY_KEYS } from 'constants/query-key.constants';
import useInvalidate from 'hooks/useInvalidate';
import { useAtom } from 'jotai';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const formSchema = z.object({
  username: z.string().min(1, SchemaUtils.message.nonempty),
  name: z.string().min(1, SchemaUtils.message.nonempty),
  email: z.string().email(SchemaUtils.message.invalidEmail),
  role: z.string().min(1, SchemaUtils.message.nonempty),
  password: z.string().min(8, SchemaUtils.message.invalidPassword),
  // groups: z.string().array().min(1, SchemaUtils.message.nonempty),
  groups: z.string().array(),
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
  const invalidate = useInvalidate();

  const [userInfo] = useAtom(userInfoAtom);
  const userRole = useMemo(() => userInfo?.role, [userInfo?.role]);

  const form = useForm({
    initialValues: initialFormValues,
    validate: zodResolver(formSchema),
  });

  const { data: groupSelect } = useQuery({
    queryKey: [QUERY_KEYS.GROUP.SELECT],
    queryFn: () => getGroupSelectAPI(),
  });

  const { mutate: createAccount, isPending } = useMutation({
    mutationFn: (request: Partial<TAccountREQ>) => createAccountWithTokenAPI(request),
    onSuccess: () => {
      invalidate({
        queryKey: [QUERY_KEYS.ACCOUNT.LIST],
      });
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

  // const roles = useMemo(()=>,[])
  const handleSubmit = form.onSubmit((formValues) => {
    createAccount({ ...formValues, status: formValues.status ? 1 : 0 });
    navigate(-1);
  });

  // EFFECTS
  useEffect(() => {
    if (userRole === EROLE.TEACHER) {
      form.setFieldValue('role', EROLE.STUDENT);
    }
  }, []);

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
          </Group>
        }
      />
      <SimpleGrid cols={{ sm: 1, lg: 2 }}>
        <Paper withBorder shadow='sm' radius='md' p='md'>
          <Stack>
            <TextInput placeholder='Nhập tên tài khoản' withAsterisk label='Tên tài khoản' {...form.getInputProps('username')} />
            <TextInput placeholder='Nhập tên' withAsterisk label='Tên chủ tài khoản' {...form.getInputProps('name')} />
            <TextInput placeholder='Nhập địa chỉ email' withAsterisk label='Email' type='email' {...form.getInputProps('email')} />
            <PasswordInput placeholder='Nhập mật khẩu' withAsterisk label='Mật khẩu' {...form.getInputProps('password')} />

            <MultiSelect
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
              disabled={userRole !== EROLE.ADMIN}
              {...form.getInputProps('role')}
              clearable
            />
            <Switch label='Kích hoạt tài khoản' {...form.getInputProps('status', { type: 'checkbox' })} />
          </Stack>
        </Paper>

        <Paper withBorder shadow='sm' radius='md' p='md' className='relative'>
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
          {form.values.role === EROLE.STUDENT && <AppFallBack variant='not-allow' />}
        </Paper>

        {isPending && <AppFallBack />}
      </SimpleGrid>
      <Group justify='flex-end'>
        <Button
          onClick={() => {
            handleSubmit();
          }}
          disabled={!form.isDirty()}
          loading={isPending}
        >
          Thêm
        </Button>
      </Group>
    </Stack>
  );
};

export default AccountCreatePage;
