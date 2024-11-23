import { queryClient } from '@api/config/queryClient';
import { getAccount, updateAccountAPI } from '@api/services/account/account.api';
import { TAccountREQ } from '@api/services/account/account.request';
import { getGroupSelectAPI } from '@api/services/group/group.api';
import AppFallBack from '@component/AppFallBack/AppFallBack';
import { PageHeader } from '@component/PageHeader/PageHeader';
import { EROLE } from '@enum/account.enum';
import { Box, Button, Checkbox, Group, Loader, MultiSelect, Paper, Select, SimpleGrid, Stack, Switch, Text, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconChevronLeft, IconChevronRight, IconUser } from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { NotifyUtils } from '@util/NotificationUtils';
import { SchemaUtils } from '@util/SchemaUtils';
import { AxiosError } from 'axios';
import { QUERY_KEYS } from 'constants/query-key.constants';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

const formSchema = z.object({
  username: z.string().min(1, SchemaUtils.message.nonempty),
  name: z.string().min(1, SchemaUtils.message.nonempty),
  email: z.string().email(SchemaUtils.message.invalidEmail),
  role: z.string().min(1, SchemaUtils.message.nonempty),
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

const AccountForm = ({ initialValues, id }: { initialValues: FormValues; id: string }) => {
  const form = useForm({
    initialValues,
    validate: zodResolver(formSchema),
  });

  // APIS
  const { data: groupSelect } = useQuery({
    queryKey: [QUERY_KEYS.GROUP.SELECT],
    queryFn: () => getGroupSelectAPI(),
  });
  const { mutate: updateAccount, isPending } = useMutation({
    mutationFn: (request: Partial<TAccountREQ>) => updateAccountAPI(request, id),
    onSuccess: () => {
      NotifyUtils.success('Cập nhật tài khoản thành công!');
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ACCOUNT.LIST, id],
      });
      form.reset();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      NotifyUtils.error(error.response?.data?.message);
    },
  });

  // METHODS
  const handlePermissionChange = (featureCode: string, permissionType: keyof FormValues['permissions'][number]['permission'], checked: boolean) => {
    // Create a new array for permissions, updating only the targeted item
    form.setFieldValue(
      'permissions',
      form.values.permissions.map((item) =>
        item.code === featureCode ? { ...item, permission: { ...item.permission, [permissionType]: checked } } : item,
      ),
    );
  };
  const handleSubmit = form.onSubmit((formValues) => {
    updateAccount({ ...formValues, status: formValues.status ? 1 : 0 });
  });

  // EFFECTS
  useEffect(() => {
    form.setValues(initialValues);
  }, [initialValues]);

  return (
    <Stack>
      <SimpleGrid cols={{ sm: 1, lg: 2 }} className='relative'>
        <Paper withBorder shadow='sm' radius='md' p='md'>
          <Stack>
            <TextInput placeholder='Nhập tên tài khoản' withAsterisk label='Tên tài khoản' {...form.getInputProps('username')} />
            <TextInput placeholder='Nhập tên' withAsterisk label='Tên chủ tài khoản' {...form.getInputProps('name')} />
            <TextInput placeholder='Nhập địa chỉ email' withAsterisk label='Email' type='email' {...form.getInputProps('email')} />

            <MultiSelect
              //withAsterisk
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
                    onChange={(e) => {
                      handlePermissionChange(feature.code, 'view', e.currentTarget.checked);
                    }}
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
          {form?.values.role === EROLE.STUDENT && <AppFallBack variant='not-allow' />}
        </Paper>

        {isPending && (
          <Box className='absolute left-0 right-0 top-0 bottom-0 bg-white opacity-70 rounded-md items-center justify-center flex'>
            <Loader />
          </Box>
        )}
      </SimpleGrid>
      <Group justify='flex-end'>
        <Button onClick={() => handleSubmit()} loading={isPending} disabled={!form.isDirty()}>
          Lưu
        </Button>
      </Group>
    </Stack>
  );
};
const AccountEditPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data: account, isFetching: isFetchingAccount } = useQuery({
    queryKey: [QUERY_KEYS.ACCOUNT.LIST, id],
    queryFn: () => getAccount({ userId: id! }),
  });

  // Function to handle permission changes

  return (
    <Stack my='1rem' mx='1rem'>
      <PageHeader
        title='Tài khoản'
        leftSection={<IconUser />}
        middleSection={
          <>
            <IconChevronRight size={'20'} />
            <Text size='xl' fw={500}>
              Chỉnh sửa
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
      {isFetchingAccount && (
        <Group justify='center' align='center'>
          <Loader size={30} />
        </Group>
      )}
      {account?.data && !isFetchingAccount && (
        <AccountForm
          id={id!}
          initialValues={{
            email: account.data.email,
            groups: account.data.groups || [],
            name: account.data.name || '',
            role: account.data.role || '',
            status: account.data.status || 0,
            username: account.data.username || '',
            permissions: account.data.permissions || [],
          }}
        />
      )}
    </Stack>
  );
};

export default AccountEditPage;
