import { PageHeader } from '@component/PageHeader/PageHeader';
import {
  ActionIcon,
  Avatar,
  Button,
  Checkbox,
  Divider,
  Group,
  Loader,
  LoadingOverlay,
  MultiSelect,
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
import { IconChevronLeft, IconChevronRight, IconInfoCircle, IconSearch, IconSettings, IconUser, IconUsersGroup, IconX } from '@tabler/icons-react';
import { SchemaUtils } from '@util/SchemaUtils';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { z } from 'zod';
import MemberItem from '../components/MemberItem';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'constants/query-key.constants';
import { getListAccountName } from '@api/services/account/account.api';
import { TAccountName } from '@api/services/account/account.request';
import { createGroupAPI, getGroupAPI, updateGroupAPI } from '@api/services/group/group.api';
import { TGroupREQ } from '@api/services/group/group.request';
import { NotifyUtils } from '@util/NotificationUtils';
import { AxiosError } from 'axios';
import { IGroup } from '@api/services/group/group.response';
import { queryClient } from '@api/config/queryClient';
const formSchema = z.object({
  groupName: z.string().min(1, SchemaUtils.message.nonempty),
  owner: z.string().min(1, SchemaUtils.message.nonempty),
  members: z
    .object({
      email: z.string(),
      name: z.string(),
      status: z.number(),
      _id: z.string(),
    })
    .array(),
  status: z.any(),
});

type FormValues = z.infer<typeof formSchema>;
const initialFormValues: FormValues = {
  groupName: '',
  owner: '',
  members: [],
  status: 0, //0: deactive ; 1: active
};

const GroupForm = ({ initialValues, id }: { initialValues: Partial<IGroup>; id: string }) => {
  const [selectedMembers, setSelectedMembers] = useState<TAccountName[]>([]);
  const [keyword, setKeyword] = useState('');
  const form = useForm({
    initialValues: {
      ...initialValues,
      owner: initialValues.owner?._id,
    },
    validate: zodResolver(formSchema),
  });
  const { data: members, isPending: isPendingAccountName } = useQuery({
    queryKey: [QUERY_KEYS.ACCOUNT.NAME, { keyword }],
    queryFn: () => getListAccountName({ keyword }),
  });
  const { mutate: updateGroup, isPending } = useMutation({
    mutationFn: (request: Partial<TGroupREQ>) => updateGroupAPI(request, id),
    onSuccess: () => {
      NotifyUtils.success('Cập nhật thông tin nhóm thành công!');
      form.reset();
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ACCOUNT.NAME, id],
      });
      setSelectedMembers([]);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      NotifyUtils.error(error.response?.data?.message);
    },
  });
  const handleSubmit = form.onSubmit((formValues) => {
    updateGroup({
      ...formValues,
      status: formValues ? 1 : 0,
      members: selectedMembers.map((member) => member._id),
    });
  });

  useEffect(() => {
    form.setValues({
      ...initialValues,
      owner: initialValues.owner?._id,
    });
    setSelectedMembers(initialValues.members || []);
  }, [initialValues]);
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
    <Stack>
      <SimpleGrid cols={2}>
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
              data={members?.data?.map((member) => ({ label: member.name, value: member._id }))}
              placeholder='Chọn trưởng nhóm'
              {...form.getInputProps('owner')}
              clearable
              searchable
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
                  <ActionIcon
                    size={'0.8rem'}
                    color={'red'}
                    pos={'absolute'}
                    top={0}
                    right={0}
                    radius={'lg'}
                    onClick={() => onMemberClick(selectedMember)}
                  >
                    <IconX />
                  </ActionIcon>
                </Stack>
              ))}
              {selectedMembers.length > 5 && <Avatar key={Math.random()} name={`+${selectedMembers.length - 4}`} color='gray'></Avatar>}
            </Group>
            <ScrollArea>
              <Stack mah={300} pos={'relative'}>
                <LoadingOverlay visible={isPendingAccountName} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />

                {members?.data?.map((member) => {
                  const checked = isChecked(member);
                  return <MemberItem key={member._id} member={member} checked={checked} onClick={onMemberClick} />;
                })}
              </Stack>
            </ScrollArea>
          </Stack>
        </Paper>
      </SimpleGrid>
      <Group justify='flex-start'>
        <Button onClick={() => handleSubmit()} loading={isPending} disabled={!form.isDirty()}>
          Lưu
        </Button>
      </Group>
    </Stack>
  );
};
const GroupEditPage = () => {
  const { id } = useParams();

  const { data: group, isPending: isPendingGroup } = useQuery({
    queryKey: [QUERY_KEYS.ACCOUNT.NAME, id],
    queryFn: () => getGroupAPI({ id: id! }),
    enabled: id ? true : false,
  });
  console.log('group', group);
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
          </Group>
        }
      />
      {isPendingGroup && (
        <Group justify='center' align='center'>
          <Loader size={30} />
        </Group>
      )}
      {group?.data && !isPendingGroup && <GroupForm id={id!} initialValues={group.data} />}
    </Stack>
  );
};

export default GroupEditPage;
