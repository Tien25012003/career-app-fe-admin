import { Button, Group, Input, Paper, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { IconAdjustmentsHorizontal, IconSearch } from '@tabler/icons-react';
import { useState } from 'react';

type AppSearchProps = {
  onSearch?: (value?: string) => void;
  onReset?: () => void;
  onFilter?: () => void;
};
const AppSearch = ({ onSearch, onReset, onFilter }: AppSearchProps) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const [search, setSearch] = useState('');
  return (
    <Paper p={'xs'} shadow='md' radius={'md'} bg={colorScheme === 'light' ? theme.colors.gray[0] : theme.colors.gray[9]} withBorder>
      <Group>
        <Button variant='light' leftSection={<IconAdjustmentsHorizontal size={'1.125rem'} />} color='grape' onClick={() => onFilter?.()}>
          Lọc
        </Button>
        <Input
          leftSection={<IconSearch size={'1.125rem'} />}
          placeholder='Tìm kiếm thông tin'
          flex={1}
          styles={{
            input: {
              borderWidth: 1,
              backgroundColor: colorScheme === 'light' ? theme.colors.gray[0] : theme.colors.gray[9],
            },
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch?.(search);
            }
          }}
        />
        <Button variant='outline' onClick={() => onSearch?.(search)}>
          Tìm kiếm
        </Button>
        <Button
          variant='outline'
          onClick={() => {
            onReset?.();
            setSearch('');
          }}
        >
          Reset
        </Button>
      </Group>
    </Paper>
  );
};

export default AppSearch;
