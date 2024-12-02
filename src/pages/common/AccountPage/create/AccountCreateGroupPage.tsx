import { getListAccountName } from '@api/services/account/account.api';
import { TAccountName } from '@api/services/account/account.request';
import { createGroupAPI } from '@api/services/group/group.api';
import { TGroupREQ } from '@api/services/group/group.request';
import { PageHeader } from '@component/PageHeader/PageHeader';
import {
  ActionIcon,
  Avatar,
  Button,
  Group,
  LoadingOverlay,
  Paper,
  ScrollArea,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconChevronLeft, IconChevronRight, IconInfoCircle, IconSearch, IconUser, IconUsersGroup, IconX } from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { NotifyUtils } from '@util/NotificationUtils';
import { SchemaUtils } from '@util/SchemaUtils';
import { AxiosError } from 'axios';
import { QUERY_KEYS } from 'constants/query-key.constants';
import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import MemberItem from '../components/MemberItem';
import { useAtom } from 'jotai';
import { userInfoAtom } from 'atoms/auth.store';
const formSchema = z.object({
  groupName: z.string().min(1, SchemaUtils.message.nonempty),
  owner: z.string().min(1, SchemaUtils.message.nonempty),
  members: z.string().array(),
  status: z.any(),
});

type FormValues = z.infer<typeof formSchema>;
const initialFormValues: FormValues = {
  groupName: '',
  owner: '',
  members: [],
  status: 0, //0: deactive ; 1: active
};

const AccountCreateGroupPage = () => {
  const [selectedMembers, setSelectedMembers] = useState<TAccountName[]>([]);
  const [keyword, setKeyword] = useState('');
  const [userInfo] = useAtom(userInfoAtom);

  const form = useForm({
    initialValues: {
      ...initialFormValues,
      owner: userInfo?.role === 'TEACHER' ? userInfo._id : '',
    },
    validate: zodResolver(formSchema),
  });
  const { data: members, isPending: isPendingAccountName } = useQuery({
    queryKey: [QUERY_KEYS.ACCOUNT.NAME, { keyword }],
    queryFn: () => getListAccountName({ keyword }),
  });
  const { mutate: createGroup, isPending: isPendingCreateGroup } = useMutation({
    mutationFn: (request: TGroupREQ) => createGroupAPI(request),
    onSuccess: () => {
      NotifyUtils.success('Tạo nhóm mới thành công!');
      form.reset();
      setSelectedMembers([]);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      NotifyUtils.error(error.response?.data?.message);
    },
  });
  const handleSubmit = form.onSubmit((formValues) => {
    createGroup({
      ...formValues,
      members: selectedMembers.map((member) => member._id),
      status: formValues.status ? 1 : 0,
    });
  });

  const isChecked = useCallback(
    (member: TAccountName) => {
      return selectedMembers.findIndex((selectedMember) => selectedMember._id === member._id) > -1 ? true : false;
    },
    [selectedMembers],
  );
  const onMemberClick = useCallback(
    (member: TAccountName) => {
      if (isChecked(member)) {
        setSelectedMembers([...selectedMembers.filter((selectedMember) => selectedMember._id !== member._id)]);
      } else setSelectedMembers([...selectedMembers, member]);
    },
    [selectedMembers, setSelectedMembers],
  );

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
          <Group>
            <Button leftSection={<IconChevronLeft size={'1.125rem'} />} component={Link} to={'/accounts'} variant='default'>
              Trở về
            </Button>
            <Button
              onClick={() => {
                handleSubmit();
              }}
              disabled={!form.isDirty()}
              loading={isPendingCreateGroup}
            >
              Thêm
            </Button>
          </Group>
        }
      />
      <SimpleGrid cols={{ sm: 1, lg: 2 }}>
        <Paper withBorder shadow='sm' radius={'md'} p='md'>
          <Stack>
            <Group>
              <IconInfoCircle />
              <Text fw={500}>Thông tin chung</Text>
            </Group>
            <TextInput placeholder='Nhập tên nhóm' withAsterisk label='Tên nhóm' {...form.getInputProps('groupName')} />
            <Select
              withAsterisk
              comboboxProps={{ withinPortal: false }}
              label='Chọn trưởng nhóm'
              data={members?.data?.filter((member) => member.role === 'TEACHER')?.map((member) => ({ label: member.name, value: member._id }))}
              placeholder='Chọn trưởng nhóm'
              {...form.getInputProps('owner')}
              clearable
              searchable
              disabled={userInfo?.role === 'TEACHER'}
            />
            <Switch label='Kích hoạt tài khoản' fw={500} {...form.getInputProps('status', { type: 'checkbox' })} />
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
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button>Tìm kiếm</Button>
            </Group>
            <Group gap={'xs'}>
              {selectedMembers.slice(0, 4).map((selectedMember) => (
                <Stack pos={'relative'}>
                  <Avatar key={selectedMember._id} name={selectedMember.name} color='initials' size={'md'} />
                  <ActionIcon size={'0.8rem'} color={'red'} pos={'absolute'} top={0} right={0} radius={'lg'}>
                    <IconX />
                  </ActionIcon>
                </Stack>
              ))}
              {selectedMembers.length > 5 && <Avatar key={Math.random()} name={`+${selectedMembers.length - 4}`} color='gray'></Avatar>}
            </Group>
            <ScrollArea>
              <Stack mah={300} pos={'relative'}>
                <LoadingOverlay visible={isPendingAccountName} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />

                {members?.data
                  ?.filter((member) => member.role === 'STUDENT')
                  ?.map((member) => {
                    const checked = isChecked(member);
                    return <MemberItem key={member._id} member={member} checked={checked} onClick={onMemberClick} />;
                  })}
              </Stack>
            </ScrollArea>
          </Stack>
        </Paper>
      </SimpleGrid>
    </Stack>
  );
};

export default AccountCreateGroupPage;
