import { PageEditor } from '@component/PageEditor/PageEditor';
import { PageHeader } from '@component/PageHeader/PageHeader';
import { Button, Divider, Group, MultiSelect, Paper, rem, ScrollArea, Select, SimpleGrid, Stack, Switch, Text, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconChevronLeft, IconChevronRight, IconInfoCircle, IconNews, IconX } from '@tabler/icons-react';
import { SchemaUtils } from '@util/SchemaUtils';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { IconUpload, IconPhoto } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
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
const NewsCreatePage = () => {
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
        title='Tin tức'
        leftSection={<IconNews />}
        middleSection={
          <>
            <IconChevronRight size={'20'} />
            <Text size='xl' fw={500}>
              Thêm mới
            </Text>
          </>
        }
        rightSection={
          <Button leftSection={<IconChevronLeft size={'1.125rem'} />} component={Link} to={'/news'} variant='default'>
            Trở về
          </Button>
        }
      />

      <Paper withBorder shadow='sm' radius={'md'} p='md'>
        <Stack>
          <SimpleGrid cols={2}>
            <Stack gap={'xs'}>
              <Group>
                <IconInfoCircle />
                <Text fw={500}>Thông tin chung</Text>
              </Group>
              <Divider />
              <Select
                withAsterisk
                comboboxProps={{ withinPortal: false }}
                label='Chọn loại tin tức'
                data={['Nổi bật', 'IT', 'Marketing']}
                placeholder='Chọn loại tin tức'
                {...form.getInputProps('owner')}
                clearable
                searchable
              />
              <Stack gap={'xs'}>
                <Text fw={500} size='sm'>
                  Chọn ảnh kích thước (312x312)
                </Text>
                <Dropzone
                  onDrop={(files) => console.log('accepted files', files)}
                  onReject={(files) => console.log('rejected files', files)}
                  maxSize={5 * 1024 ** 2}
                  accept={IMAGE_MIME_TYPE}
                >
                  <Group justify='center' gap='xl' mih={220} style={{ pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                      <IconUpload style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }} stroke={1.5} />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                      <IconX style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }} stroke={1.5} />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                      <IconPhoto style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }} stroke={1.5} />
                    </Dropzone.Idle>

                    <div>
                      <Text size='xl' inline>
                        Kéo hoặc chọn ảnh
                      </Text>
                      <Text size='sm' c='dimmed' inline mt={7}>
                        Mỗi file / ảnh phải có kích thước nhỏ hơn 5MB
                      </Text>
                    </div>
                  </Group>
                </Dropzone>
              </Stack>
              <Stack gap={'xs'}>
                <Text fw={500} size='sm'>
                  Chọn ảnh kích thước (512x512)
                </Text>
                <Dropzone
                  onDrop={(files) => console.log('accepted files', files)}
                  onReject={(files) => console.log('rejected files', files)}
                  maxSize={5 * 1024 ** 2}
                  accept={IMAGE_MIME_TYPE}
                >
                  <Group justify='center' gap='xl' mih={220} style={{ pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                      <IconUpload style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }} stroke={1.5} />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                      <IconX style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }} stroke={1.5} />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                      <IconPhoto style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }} stroke={1.5} />
                    </Dropzone.Idle>

                    <div>
                      <Text size='xl' inline>
                        Kéo hoặc chọn ảnh
                      </Text>
                      <Text size='sm' c='dimmed' inline mt={7}>
                        Mỗi file / ảnh phải có kích thước nhỏ hơn 5MB
                      </Text>
                    </div>
                  </Group>
                </Dropzone>
              </Stack>
            </Stack>

            <Stack>
              <Stack gap={'xs'}>
                <Text fw={500} size='sm'>
                  Nhập tiêu đề
                </Text>
                <PageEditor />
              </Stack>
              <Stack gap={'xs'}>
                <Text size='sm' fw={500}>
                  Nhập nội dung
                </Text>
                <PageEditor />
              </Stack>
            </Stack>
          </SimpleGrid>
          <Divider />
          <Group justify='flex-end'>
            <Button>Thêm mới</Button>
          </Group>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default NewsCreatePage;
