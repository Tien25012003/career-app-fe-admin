import PageTitle from '@component/PageTitle/PageTitle';
import { Button, Group, Paper, Stack } from '@mantine/core';
import { useState } from 'react';
import { DictionaryTable } from './components';
import { IconBook2, IconPlus } from '@tabler/icons-react';
import AppSearch from '@component/AppSearch/AppSearch';
import { Link } from 'react-router-dom';
import { GROUPS } from 'constants/groups';

export default function DictionaryPage() {
  const [selectedGroup, setSelectedGroup] = useState('Khối A0');

  return (
    <Stack my='1rem' mx='1rem'>
      <Group justify='space-between'>
        <Group>
          <IconBook2 />
          <PageTitle>Từ điển</PageTitle>
        </Group>
        <Button leftSection={<IconPlus size={'1.125rem'} />} component={Link} to={'create'}>
          Thêm mới
        </Button>
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
