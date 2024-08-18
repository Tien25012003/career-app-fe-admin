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

const GROUPS = ['A0', 'B', 'C', 'D1', 'D7'];

export default function DictionaryPage() {
  const [selectedGroup, setSelectedGroup] = useState('A0');
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  return (
    <Stack my='1rem' mx='1rem'>
      <PageTitle>Từ điển</PageTitle>
      <Group wrap='wrap'>
        {GROUPS.map((btn, index) => {
          return (
            <Button
              key={index}
              variant={selectedGroup === btn ? 'filled' : 'default'}
              miw={100}
              onClick={() => setSelectedGroup(btn)}
            >
              {btn}
            </Button>
          );
        })}
      </Group>
      {/* <DictionaryTable /> */}
    </Stack>
  );
}
