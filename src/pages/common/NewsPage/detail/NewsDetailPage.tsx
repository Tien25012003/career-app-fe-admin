import { getNewsDetailAPI } from '@api/services/news/news.api';
import { NewsItem } from '@api/services/news/news.response';
import { PageHeader } from '@component/PageHeader/PageHeader';
import { Button, Divider, Group, Image, Paper, Select, SimpleGrid, Stack, Text, Textarea, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconChevronLeft, IconChevronRight, IconInfoCircle, IconNews } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { SchemaUtils } from '@util/SchemaUtils';
import { QUERY_KEYS } from 'constants/query-key.constants';

import { Link, useNavigate, useParams } from 'react-router-dom';
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

type TNewsForm = {
  news: NewsItem;
};
const NewsForm = ({ news }: TNewsForm) => {
  const form = useForm({
    initialValues: news,
    validate: zodResolver(formSchema),
  });

  return (
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
              disabled
            />
            <Stack gap={'xs'}>
              <Text variant='text' fz={'h6'} fw={500}>
                Chọn ảnh kích thước (312x312)
              </Text>
              <Image src={form.getValues().image.longImage} h={150} w={'100%'} />
              <Text variant='text' fz={'h6'} fw={500}>
                Chọn ảnh kích thước (512x512)
              </Text>
              <Image src={form.getValues().image.longImage} h={150} w={'100%'} />
            </Stack>
          </Stack>

          <Stack>
            <Textarea label={'Nhập tiêu đề'} withAsterisk placeholder='Nhập tiêu đề' rows={5} {...form.getInputProps('title')} disabled />
            <TextInput
              type='url'
              label={'Đường dẫn tin tức'}
              withAsterisk
              placeholder='Đường dẫn tin tức'
              {...form.getInputProps('content')}
              disabled
            />
          </Stack>
        </SimpleGrid>
      </Stack>
    </Paper>
  );
};

const NewsDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: news, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.NEWS.DETAIL],
    queryFn: () => getNewsDetailAPI({ id: id! }),
    enabled: !!id,
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
              Chi tiết
            </Text>
          </>
        }
        rightSection={
          <Button leftSection={<IconChevronLeft size={'1.125rem'} />} component={Link} to={'/news'} variant='default'>
            Trở về
          </Button>
        }
      />

      {news && <NewsForm news={news} />}
    </Stack>
  );
};

export default NewsDetailPage;
