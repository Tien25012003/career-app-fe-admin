import { addMajorAPI, getMajorGroupsAPI } from '@api/services/dictionary/dictionary.api';
import { AddMajorREQ } from '@api/services/dictionary/dictionary.request';
import { uploadAPI } from '@api/services/uploads/uploads.api';
import { PageHeader } from '@component/PageHeader/PageHeader';
import { PageUploader } from '@component/PageUploader/PageUploader';
import { onError } from '@helper/error.helpers';
import { Button, ComboboxItem, Divider, Grid, Group, MultiSelect, Paper, Select, Stack, Text, Textarea, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useFocusTrap } from '@mantine/hooks';
import { IconBook2, IconChevronLeft, IconChevronRight, IconFileDescription, IconInfoCircle } from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { NotifyUtils } from '@util/NotificationUtils';
import { SchemaUtils } from '@util/SchemaUtils';
import { QUERY_KEYS } from 'constants/query-key.constants';
import { ROUTES } from 'constants/routes.constants';
import useInvalidate from 'hooks/useInvalidate';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

const formSchema = z.object({
  group: z.string().trim().min(1, SchemaUtils.message.nonempty),
  name: z.string().trim().min(1, SchemaUtils.message.nonempty),
  subjects: z.array(z.string()).min(1, SchemaUtils.message.nonempty),
  image: z.string().min(0),
  imageFile: z.instanceof(File).nullable().refine(SchemaUtils.vaidator.isNonNullFile, SchemaUtils.message.nonempty).default(null),
  pros: z.string().min(1, SchemaUtils.message.nonempty),
  cons: z.string().min(1, SchemaUtils.message.nonempty),
});

type FormValues = z.infer<typeof formSchema>;
const initialFormValues: FormValues = {
  group: '',
  name: '',
  subjects: [],
  image: '',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  imageFile: null,
  pros: '',
  cons: '',
};

const SUBJECTS = ['Ngữ văn', 'Toán', 'Ngoại ngữ', 'Lịch sử', 'Hoá học', 'Tin học', 'Địa lí', 'Vật lí', 'Sinh học', 'Giáo dục công dân'];
export default function DictionaryCreatePage() {
  const focusTrapRef = useFocusTrap();

  const [isUploadingFiles, setIsUploadingFiles] = useState(false);

  const invalidate = useInvalidate();
  const navigate = useNavigate();

  // FORM
  const form = useForm({
    initialValues: initialFormValues,
    validate: zodResolver(formSchema),
  });

  const { data: groups, isFetching: isFetchingGroups } = useQuery({
    queryKey: [QUERY_KEYS.DICTIONARY.GROUPS],
    queryFn: () => getMajorGroupsAPI(),
    select: ({ data }) => data,
  });

  const items = useMemo<ComboboxItem[]>(
    () =>
      groups?.map((g) => ({
        value: g._id,
        label: g.group,
      })) || [],
    [groups],
  );

  // APIS
  const { mutate: addMajorMutation, isPending: isAdding } = useMutation({
    mutationFn: (request: AddMajorREQ) => addMajorAPI(request),
    onSuccess: () => {
      invalidate({
        queryKey: [QUERY_KEYS.DICTIONARY.LIST],
      });
      NotifyUtils.success('Thêm mới thành công!');
      form.reset();
      navigate(ROUTES.DICTIONARY);
    },
    onError,
  });

  // METHODS
  const handleSubmit = form.onSubmit(async (formValues) => {
    setIsUploadingFiles(true);
    try {
      const formData = new FormData();
      formData.append('file', formValues.imageFile);
      formData.append('folderName', 'dictionay');
      const imageResp = await uploadAPI(formData);
      const request: AddMajorREQ = {
        image: imageResp.data.url || null,
        imageKey: imageResp.data.key || null,
        subjects: formValues.subjects?.join(','),
        groupId: formValues.group,
        name: formValues.name,
        pros: formValues.pros,
        cons: formValues.cons,
      };
      addMajorMutation(request);
    } catch (error) {
      NotifyUtils.error('Lỗi upload hình ảnh!');
      setIsUploadingFiles(false);
    } finally {
      setIsUploadingFiles(false);
    }
  });

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
          <Button leftSection={<IconChevronLeft size={'1.125rem'} />} component={Link} to={'/dictionary'} variant='default'>
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
                <Select withAsterisk comboboxProps={{ withinPortal: false }} label='Khối' data={items} {...form.getInputProps('group')} clearable />
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
                    image: true,
                    isLoading: false,
                    height: 150,
                  }}
                  placeholder='Chọn hình'
                  withAsterisk
                  label='Hình ảnh'
                  clearable
                  {...form.getInputProps('imageFile')}
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
                <Textarea label='Lợi thế' withAsterisk autosize minRows={10} {...form.getInputProps('pros')} />
                <Textarea label='Khó khăn' withAsterisk autosize minRows={10} {...form.getInputProps('cons')} />
              </Stack>
            </Grid.Col>
          </Grid>

          <Divider />
          <Group justify='space-between'>
            <Button variant='default' onClick={form.reset}>
              Mặc định
            </Button>
            <Button onClick={() => handleSubmit()} disabled={!form.isDirty()} loading={isUploadingFiles}>
              Thêm
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Stack>
  );
}
