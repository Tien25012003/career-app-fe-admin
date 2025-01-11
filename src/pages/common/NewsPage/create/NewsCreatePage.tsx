import { queryClient } from '@api/config/queryClient';
import { createNewsAPI } from '@api/services/news/news.api';
import { NewsItem } from '@api/services/news/news.response';
import { uploadAPI } from '@api/services/uploads/uploads.api';
import { PageHeader } from '@component/PageHeader/PageHeader';
import { PageUploader } from '@component/PageUploader/PageUploader';
import { Button, Divider, Group, Paper, Select, SimpleGrid, Stack, Text, Textarea, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconChevronLeft, IconChevronRight, IconInfoCircle, IconNews } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { NotifyUtils } from '@util/NotificationUtils';
import { SchemaUtils } from '@util/SchemaUtils';
import { AxiosError } from 'axios';
import { QUERY_KEYS } from 'constants/query-key.constants';
import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
const formSchema = z.object({
  type: z.string().min(1, SchemaUtils.message.nonempty),
  title: z.string().min(1, SchemaUtils.message.nonempty),
  content: z.string().min(1, SchemaUtils.message.nonempty),
  image: z
    .object({
      longImage: z.string().min(0),
      shortImage: z.string().min(0),
    })
    .nullable()
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;
const initialFormValues: FormValues = {
  type: '',
  title: '',
  content: '',
  image: {
    longImage: '',
    shortImage: '',
  },
};

const NewsCreatePage = () => {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: initialFormValues,
    validate: zodResolver(formSchema),
  });
  const [isUploadFile, setIsUploadFile] = useState(false);
  const [shortImage, setShortImage] = useState<File>();
  const [longImage, setLongImage] = useState<File>();
  const { mutate: createNews, isPending } = useMutation({
    mutationFn: (request: Omit<NewsItem, '_id' | 'createdAt'>) => createNewsAPI(request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.NEWS.ALL],
      });
      NotifyUtils.success('Thêm mới thành công!');
      form.reset();
      navigate(-1);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      NotifyUtils.error(error.response?.data?.message);
    },
  });
  const handleSubmit = form.onSubmit(async (formValues) => {
    if (shortImage && longImage) {
      setIsUploadFile(true);
      try {
        const shortFormData = new FormData();
        shortFormData.append('file', shortImage);
        shortFormData.append('folderName', 'news');

        const longFormData = new FormData();
        longFormData.append('file', longImage);
        longFormData.append('folderName', 'news');

        // Use Promise.all with proper destructuring
        const [shortImageRes, longImageRes] = await Promise.all([await uploadAPI(shortFormData), await uploadAPI(longFormData)]);
        setIsUploadFile(false);
        createNews({
          ...formValues,
          image: {
            longImage: longImageRes.data.url || '',
            shortImage: shortImageRes.data.url || '',
          },
        });
      } catch (error) {
        setIsUploadFile(false);

        console.error('Error uploading images:', error);
        // Handle the error, e.g., show a notification or update UI
      }
    } else {
      NotifyUtils.info('Vui lòng điền đầy đủ thông tin');
    }
  });

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
          <SimpleGrid cols={{ sm: 1, lg: 2 }}>
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
                data={['BREAKING', 'NORMAL']}
                placeholder='Chọn loại tin tức'
                {...form.getInputProps('type')}
                clearable
                searchable
              />
              <Stack gap={'xs'}>
                <PageUploader
                  previewProps={{
                    image: true,
                    isLoading: false,
                    height: 150,
                  }}
                  placeholder='Chọn ảnh kích thước (312x312)'
                  withAsterisk
                  label='Chọn ảnh kích thước (312x312)'
                  clearable
                  value={shortImage}
                  onChange={(file) => file && setShortImage(file)}
                />
              </Stack>
              <PageUploader
                previewProps={{
                  image: true,
                  isLoading: false,
                  height: 150,
                }}
                placeholder='Chọn ảnh kích thước (512x512)'
                withAsterisk
                label='Chọn ảnh kích thước (512x512)'
                clearable
                value={longImage}
                onChange={(file) => file && setLongImage(file)}
              />
            </Stack>

            <Stack>
              <Textarea label={'Nhập tiêu đề'} withAsterisk placeholder='Nhập tiêu đề' rows={5} {...form.getInputProps('title')} />
              <TextInput type='url' label={'Đường dẫn tin tức'} withAsterisk placeholder='Đường dẫn tin tức' {...form.getInputProps('content')} />
            </Stack>
          </SimpleGrid>
          <Divider />
          <Group justify='flex-end'>
            <Button loading={isUploadFile || isPending} disabled={!form.isDirty()} onClick={() => handleSubmit()}>
              Thêm mới
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default NewsCreatePage;
