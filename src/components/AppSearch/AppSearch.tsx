import { Button, Group, Input, Paper, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { IconAdjustmentsHorizontal, IconPlus, IconSearch } from '@tabler/icons-react';
import React from 'react';

const AppSearch = () => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  return (
    <Paper
      p={'xs'}
      shadow='md'
      radius={'md'}
      bg={colorScheme === 'light' ? theme.colors.gray[0] : theme.colors.gray[9]}
    >
      <Group>
        <Button
          variant='light'
          leftSection={<IconAdjustmentsHorizontal size={'1.125rem'} />}
          color='grape'
        >
          Lọc
        </Button>
        <Input
          leftSection={<IconSearch size={'1.125rem'} />}
          placeholder='Tìm kiếm thông tin'
          flex={1}
          styles={{
            input: {
              borderWidth: 0,
              backgroundColor:
                colorScheme === 'light' ? theme.colors.gray[0] : theme.colors.gray[9],
            },
          }}
        />
        <Button variant='outline'>Tìm kiếm</Button>
        <Button leftSection={<IconPlus size={'1.125rem'} />}>Thêm mới</Button>
      </Group>
    </Paper>
  );
};

export default AppSearch;
