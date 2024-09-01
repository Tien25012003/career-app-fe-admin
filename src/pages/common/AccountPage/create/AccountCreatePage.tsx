import { PageHeader } from '@component/PageHeader/PageHeader';
import { Button, Group, Stack, Text } from '@mantine/core';
import { IconChevronLeft, IconChevronRight, IconUser } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';

const AccountCreatePage = () => {
  return (
    <Stack my='1rem' mx='1rem'>
      <PageHeader
        title='Từ điển'
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
          <Button
            leftSection={<IconChevronLeft size={'1.125rem'} />}
            component={Link}
            to={'/accounts'}
            variant='default'
          >
            Trở về
          </Button>
        }
      />
      <Group></Group>
    </Stack>
  );
};

export default AccountCreatePage;
