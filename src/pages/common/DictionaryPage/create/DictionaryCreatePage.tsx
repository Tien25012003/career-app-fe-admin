import { PageHeader } from '@component/PageHeader/PageHeader';
import { PageUploader } from '@component/PageUploader/PageUploader';
import {
  Button,
  Divider,
  Grid,
  Group,
  MultiSelect,
  Paper,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useFocusTrap } from '@mantine/hooks';
import {
  IconBook2,
  IconChevronLeft,
  IconChevronRight,
  IconFileDescription,
  IconInfoCircle,
} from '@tabler/icons-react';
import { SchemaUtils } from '@util/SchemaUtils';
import { GROUPS } from 'constants/groups';
import { Link } from 'react-router-dom';
import { z } from 'zod';

const formSchema = z.object({
  group: z.string().trim().min(1, SchemaUtils.message.nonempty),
  name: z.string().trim().min(1, SchemaUtils.message.nonempty),
  subjects: z.array(z.string().trim().min(1, SchemaUtils.message.nonempty)),
  image: z
    .instanceof(File)
    .nullable()
    .refine(SchemaUtils.vaidator.isNonNullFile, SchemaUtils.message.nonempty),
  pros: z.string().min(1, SchemaUtils.message.nonempty),
  cons: z.string().min(1, SchemaUtils.message.nonempty),
});

type FormValues = z.infer<typeof formSchema>;
const initialFormValues: FormValues = {
  group: '',
  name: '',
  subjects: [],
  image: null,
  pros: '',
  cons: '',
};

const SUBJECTS = [
  'Ngữ văn',
  'Toán',
  'Ngoại ngữ',
  'Lịch sử',
  'Hoá học',
  'Tin học',
  'Địa lí',
  'Vật lí',
  'Sinh học',
  'Giáo dục công dân',
];
export default function DictionaryCreatePage() {
  const focusTrapRef = useFocusTrap();
  const form = useForm({
    initialValues: initialFormValues,
    validate: zodResolver(formSchema),
  });
  const handleSubmit = form.onSubmit((formValues) => {});
  return (
    <Stack my='1rem' mx='1rem'>
      <PageHeader
        title='Từ điển'
        leftSection={<IconBook2 />}
        middleSection={
          <>
            <IconChevronRight size={'20'} />
            <Text size='xl' fw={500}>
              Thêm mới
            </Text>
          </>
        }
        rightSection={
          <Button
            leftSection={<IconChevronLeft size={'1.125rem'} />}
            component={Link}
            to={'/dictionary'}
            variant='default'
          >
            Trở về
          </Button>
        }
      />

      <Paper withBorder shadow='sm' radius={'md'} p='md'>
        <Stack ref={focusTrapRef}>
          <Grid>
            <Grid.Col span={{ sm: 12, lg: 6 }}>
              <Stack>
                <Group>
                  <IconInfoCircle />
                  <Text fw={500}>Thông tin chung</Text>
                </Group>
                <Divider />
                <Select
                  withAsterisk
                  comboboxProps={{ withinPortal: false }}
                  label='Khối'
                  data={GROUPS}
                  {...form.getInputProps('group')}
                  clearable
                />
                <TextInput withAsterisk label='Tên ngành' {...form.getInputProps('name')} />
                <MultiSelect
                  withAsterisk
                  comboboxProps={{ withinPortal: false }}
                  label='Môn thi'
                  data={SUBJECTS}
                  {...form.getInputProps('subjects')}
                  clearable
                />
                <PageUploader
                  previewProps={{
                    image: false,
                    isLoading: false,
                  }}
                  placeholder='Chọn hình'
                  withAsterisk
                  label='Hình ảnh'
                  clearable
                  {...form.getInputProps('image')}
                />
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ sm: 12, lg: 6 }}>
              <Stack>
                <Group>
                  <IconFileDescription />
                  <Text fw={500}>Nội dung</Text>
                </Group>
                <Divider />
                <Textarea
                  label='Lợi thế'
                  withAsterisk
                  autosize
                  minRows={4}
                  {...form.getInputProps('pros')}
                />
                <Textarea
                  label='Khó khăn'
                  withAsterisk
                  autosize
                  minRows={4}
                  {...form.getInputProps('cons')}
                />
              </Stack>
            </Grid.Col>
          </Grid>

          <Divider />
          <Group justify='space-between'>
            <Button variant='default' onClick={form.reset}>
              Mặc định
            </Button>
            <Button onClick={() => handleSubmit()} disabled={!form.isDirty()}>
              Thêm
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Stack>
  );
}
