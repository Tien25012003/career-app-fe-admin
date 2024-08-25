import PageTitle from '@component/PageTitle/PageTitle';
import {
  Button,
  Group,
  Paper,
  Stack,
  useMantineColorScheme,
  useMantineTheme,
  Table,
  Checkbox,
} from '@mantine/core';
import { useState } from 'react';
import { DictionaryTable } from './components';
import PageSegmentControl from '@component/PageSegmentControl';
import { IconBook2 } from '@tabler/icons-react';
import AppSearch from '@component/AppSearch/AppSearch';

const GROUPS = ['Khối A0', 'Khối B', 'Khối C', 'Khối D1', 'Khối D7'];

export default function DictionaryPage() {
  const [selectedGroup, setSelectedGroup] = useState('Khối A0');
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  return (
    <Stack my='1rem' mx='1rem'>
      <Group>
        <IconBook2 />
        <PageTitle>Từ điển</PageTitle>
      </Group>
      <Group wrap='wrap'>
        {GROUPS.map((btn, index) => {
          return (
            <Button
              key={index}
              variant={selectedGroup === btn ? 'filled' : 'outline'}
              miw={100}
              onClick={() => setSelectedGroup(btn)}
            >
              {btn}
            </Button>
          );
        })}
      </Group>
      <AppSearch />
      <DictionaryTable />
    </Stack>
  );
}
