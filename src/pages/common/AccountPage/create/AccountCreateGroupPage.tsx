import { PageHeader } from '@component/PageHeader/PageHeader';
import {
  ActionIcon,
  Avatar,
  Button,
  Checkbox,
  Divider,
  Group,
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
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import MemberItem from '../components/MemberItem';
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

type TMember = {
  key: number;
  name: string;
  email: string;
};
const MEMBERS = Array.from<TMember>({ length: 10 }).map(() => ({
  key: Math.floor(Math.random() * 1000),
  name: 'KHANG' + Math.floor(Math.random() * 1000),
  email: `Khang${Math.floor(Math.random() * 1000)}@gmail.com`,
}));
const AccountCreateGroupPage = () => {
  const [selectedMembers, setSelectedMembers] = useState<TMember[]>([]);
  const form = useForm({
    initialValues: initialFormValues,
    validate: zodResolver(formSchema),
  });
  const handleSubmit = form.onSubmit((formValues) => {});

  const isChecked = useCallback(
    (member: TMember) => {
      return selectedMembers.findIndex((selectedMember) => selectedMember.key === member.key) > -1 ? true : false;
    },
    [selectedMembers],
  );
  const onMemberClick = useCallback(
    (member: TMember) => {
      if (isChecked(member)) {
        setSelectedMembers([...selectedMembers.filter((selectedMember) => selectedMember.key !== member.key)]);
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
            <TextInput placeholder='Nhập tên nhóm' withAsterisk label='Tên nhóm' {...form.getInputProps('groupName')} />
            <Select
              withAsterisk
              comboboxProps={{ withinPortal: false }}
              label='Chọn trưởng nhóm'
              data={['Đoàn Tấn Khang', 'Nguyễn Thị Phương Tiên']}
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
                {...form.getInputProps('groupName')}
              />
              <Button>Tìm kiếm</Button>
            </Group>
            <Group gap={'xs'}>
              {selectedMembers.slice(0, 4).map((selectedMember) => (
                <Stack pos={'relative'}>
                  <Avatar key={selectedMember.key} name={selectedMember.name} color='initials' size={'md'} />
                  <ActionIcon size={'0.8rem'} color={'red'} pos={'absolute'} top={0} right={0} radius={'lg'}>
                    <IconX />
                  </ActionIcon>
                </Stack>
              ))}
              {selectedMembers.length > 5 && <Avatar key={Math.random()} name={`+${selectedMembers.length - 4}`} color='gray'></Avatar>}
            </Group>
            <ScrollArea>
              <Stack mah={300}>
                {MEMBERS.map((member) => {
                  const checked = isChecked(member);
                  return <MemberItem key={member.key} member={member} checked={checked} onClick={onMemberClick} />;
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
