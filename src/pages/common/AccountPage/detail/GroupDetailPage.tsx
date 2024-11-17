import { PageHeader } from '@component/PageHeader/PageHeader';
import {
  ActionIcon,
  Avatar,
  Button,
  Checkbox,
  Divider,
  Group,
  LoadingOverlay,
  Modal,
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
import { useForm, UseFormReturnType, zodResolver } from '@mantine/form';
import {
  IconBook2,
  IconChevronLeft,
  IconChevronRight,
  IconInfoCircle,
  IconSearch,
  IconSettings,
  IconUser,
  IconUsersGroup,
  IconX,
} from '@tabler/icons-react';
import { SchemaUtils } from '@util/SchemaUtils';
import React, { useCallback, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { z } from 'zod';
import MemberItem from '../components/MemberItem';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'constants/query-key.constants';
import { getAccount, getListAccountName } from '@api/services/account/account.api';
import { TAccountName } from '@api/services/account/account.request';
import { createGroupAPI, getGroupAPI } from '@api/services/group/group.api';
import { TGroupREQ } from '@api/services/group/group.request';
import { NotifyUtils } from '@util/NotificationUtils';
import { AxiosError } from 'axios';
import { IGroup } from '@api/services/group/group.response';
import { getExamListAPI, removeExamInGroup } from '@api/services/exam/exam.api';
import ExamItem from '../components/ExamItem';
import { useDisclosure } from '@mantine/hooks';
import ExamInGroupModal from '../components/ExamInGroupModal';
import { TExamToGroupREQ } from '@api/services/exam/exam.request';
import { queryClient } from '@api/config/queryClient';
const formSchema = z.object({
  groupName: z.string().min(1, SchemaUtils.message.nonempty),
  owner: z
    .object({
      email: z.string(),
      name: z.string(),
      status: z.number(),
      _id: z.string(),
    })
    .nullable(),
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

const GroupFormPage = (group: Partial<IGroup>) => {
  const initialFormValues: FormValues = {
    groupName: group.groupName || '',
    owner: group.owner || null,
    members: group.members || [],
    status: group.status, //0: deactive ; 1: active
  };
  const [openedExamInGroup, { open: openExamInGroup, close: closeExamInGroup }] = useDisclosure(false);
  const [queryExam, setQueryExam] = useState('');

  const form = useForm({
    initialValues: initialFormValues,
    validate: zodResolver(formSchema),
  });
  const { data: members, isPending: isPendingAccountName } = useQuery({
    queryKey: [QUERY_KEYS.ACCOUNT.NAME],
    queryFn: () => getListAccountName({ keyword: '' }),
  });
  const { data: examsInGroup, isPending: isPendingExamInGroup } = useQuery({
    queryKey: [QUERY_KEYS.EXAM.LIST, queryExam, group._id],
    queryFn: () => getExamListAPI({ groupId: group._id!, name: queryExam }),
  });
  const { mutate: removeExam } = useMutation({
    mutationFn: (value: TExamToGroupREQ) => removeExamInGroup(value),
    onSuccess: () => {
      NotifyUtils.success('Thêm bài kiểm tra thành công!');
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.EXAM.LIST, queryExam, group._id],
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      NotifyUtils.error(error.response?.data?.message);
    },
  });
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
              value={form.getValues().owner?._id}
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
                onChange={(e) => setQueryExam(e.target.value)}
              />
              <Button>Tìm kiếm</Button>
            </Group>
            <ScrollArea>
              <Stack mah={300} pos={'relative'}>
                <LoadingOverlay visible={isPendingAccountName} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />

                {form.getValues().members.map((member) => {
                  return <MemberItem key={member._id} member={member} checked={true} />;
                })}
              </Stack>
            </ScrollArea>
          </Stack>
        </Paper>
      </SimpleGrid>
      <SimpleGrid cols={2}>
        <Paper withBorder shadow='sm' radius={'md'} p='md'>
          <Stack>
            <Group justify='space-between'>
              <Group>
                <IconBook2 />
                <Text fw={500}>Danh sách bài kiểm tra</Text>
              </Group>
              <Button variant='transparent' onClick={openExamInGroup}>
                Thêm
              </Button>
            </Group>
            <Group>
              <TextInput
                flex={1}
                placeholder='Nhập tên bài kiểm tra'
                leftSection={<IconSearch size={'1.125rem'} />}
                onChange={(e) => setQueryExam(e.target.value)}
                defaultValue={queryExam}
              />
            </Group>
            <ScrollArea>
              <Stack mah={300} pos={'relative'}>
                <LoadingOverlay visible={isPendingExamInGroup} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />

                {examsInGroup?.data.map((exam) => {
                  return <ExamItem key={exam._id} exam={exam} onRemoveClick={() => removeExam({ examId: exam._id, groupId: group._id! })} />;
                })}
              </Stack>
            </ScrollArea>
          </Stack>
        </Paper>
        {/* <Paper withBorder shadow='sm' radius={'md'} p='md'>
          <Stack>
            <Group>
              <IconUsersGroup />
              <Text fw={500}>Chọn thành viên</Text>
            </Group>
            <Group>
              <TextInput flex={1} placeholder='Nhập tên thành viên' leftSection={<IconSearch size={'1.125rem'} />} />
              <Button>Tìm kiếm</Button>
            </Group>
            <ScrollArea>
              <Stack mah={300} pos={'relative'}>
                <LoadingOverlay visible={isPendingAccountName} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />

                {form.getValues().members.map((member) => {
                  return <MemberItem key={member._id} member={member} checked={true} />;
                })}
              </Stack>
            </ScrollArea>
          </Stack>
        </Paper> */}
      </SimpleGrid>
      {group?._id && <ExamInGroupModal groupId={group._id} opened={openedExamInGroup} onClose={closeExamInGroup} />}
    </Stack>
  );
};
const GroupDetailPage = () => {
  const { id } = useParams();

  const { data: group, isPending: isPendingGroup } = useQuery({
    queryKey: [QUERY_KEYS.ACCOUNT.NAME, { id }],
    queryFn: () => getGroupAPI({ id: id! }),
    enabled: id ? true : false,
  });

  return (
    <Stack my='1rem' mx='1rem'>
      <PageHeader
        title='Nhóm'
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
          <Group>
            <Button leftSection={<IconChevronLeft size={'1.125rem'} />} component={Link} to={'/accounts'} variant='default'>
              Trở về
            </Button>
            <Button>Chỉnh sửa</Button>
          </Group>
        }
      />
      {group && <GroupFormPage {...group.data} />}
    </Stack>
  );
};

export default GroupDetailPage;
