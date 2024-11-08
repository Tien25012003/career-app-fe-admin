import { TAccountName } from '@api/services/account/account.request';
import { Avatar, Group, Paper, Stack, Text } from '@mantine/core';
import { IconChecks } from '@tabler/icons-react';

type TMemberItem = {
  member: TAccountName;
  checked: boolean;
  onClick: (member: TAccountName) => void;
};
const MemberItem = ({ member, onClick, checked }: TMemberItem) => {
  return (
    <Paper withBorder py={'md'} px={'lg'} onClick={() => onClick(member)}>
      <Group justify='space-between' flex={1}>
        <Group>
          <Avatar color='initials' name={member.name} size={'md'} />
          <Stack gap={'0.5rem'}>
            <Text size='1rem' fw={500}>
              {member.name}
            </Text>
            <Text size='1rem' c={'gray'}>
              {member.email}
            </Text>
          </Stack>
        </Group>
        {checked && <IconChecks color='green' size={'1.75rem'} />}
      </Group>
    </Paper>
  );
};

export default MemberItem;
