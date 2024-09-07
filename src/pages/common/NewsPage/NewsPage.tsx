import AppSearch from '@component/AppSearch/AppSearch';
import AppTable from '@component/AppTable/AppTable';
import { PageHeader } from '@component/PageHeader/PageHeader';
import { TableButton } from '@component/TableButton/TableButton';
import { Badge, Button, Group, Image, Modal, ScrollArea, Stack, Text } from '@mantine/core';
import { IconBrandWechat, IconNews, IconPlus } from '@tabler/icons-react';
import { DateUtils } from '@util/DateUtils';
import { useState } from 'react';
import { Link } from 'react-router-dom';
type TNews = {
  id: number;
  createdAt: Date;
  title: string;
  content: string;
  type: string;
  image: {
    longImage?: string;
    shortImage: string;
  };
};
const newsDummyData: TNews[] = [
  {
    id: Math.floor(Math.random()),
    createdAt: new Date(),
    title: '<p>Hello</p>',
    content: '<p>Xin chào</p>',
    type: 'TIN NỔI BẬT',
    image: {
      longImage: 'https://i.pinimg.com/736x/37/39/e1/3739e1178173ffe482f8e73ca8e84a62.jpg',
      shortImage: 'https://i.pinimg.com/564x/89/a9/f1/89a9f1896fc565b878a55c5f708afb73.jpg',
    },
  },
];
export default function NewsPage() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  return (
    <Stack my='1rem' mx='1rem'>
      <PageHeader
        title='Tin tức'
        leftSection={<IconNews />}
        rightSection={
          <Button leftSection={<IconPlus size={'1.125rem'} />} component={Link} to={'create'}>
            Thêm mới
          </Button>
        }
      />
      <AppSearch />
      <AppTable
        data={newsDummyData}
        columns={[
          {
            accessor: 'id',
            title: 'ID',
            width: 50,
            textAlign: 'center',
          },
          {
            accessor: 'image',
            title: 'Hình ảnh',
            width: 300,
            render: (record) => (
              <Group justify='space-around'>
                <Image src={record.image.shortImage} w={150} h={100} />
                <Image src={record.image.longImage} w={150} h={100} />
              </Group>
            ),
          },
          {
            accessor: 'title',
            title: 'Tiêu đề',
            render: (record) => <div dangerouslySetInnerHTML={{ __html: record.title }}></div>,
          },

          {
            accessor: 'content',
            title: 'Nội dung',
            render: (record) => (
              <ScrollArea>
                <Stack mah={300}>
                  <div dangerouslySetInnerHTML={{ __html: record.title }}></div>
                </Stack>
              </ScrollArea>
            ),
          },
          {
            accessor: 'type',
            title: 'Loại tin tức',
            render: (record) => <Badge>{record.type}</Badge>,
          },
          {
            accessor: 'createdAt',
            title: 'Ngày tạo',
            render: (record) => <Text>{DateUtils.fDate(record.createdAt)}</Text>,
          },
          {
            accessor: 'actions',
            title: 'Thao tác',
            textAlign: 'center',
            render: () => <TableButton onView={() => {}} onEdit={() => {}} onDelete={() => {}} />,
          },
        ]}
      />
    </Stack>
  );
}
