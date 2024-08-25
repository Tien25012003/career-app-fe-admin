import { ActionIcon, Group } from '@mantine/core';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import React from 'react';
type Props = {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};
export function TableButton({ onView, onEdit, onDelete }: Props) {
  return (
    <Group wrap='nowrap' gap={'xs'} align='center' justify='center'>
      {onView && (
        <ActionIcon variant='outline' onClick={onView}>
          <IconEye size='1rem' />
        </ActionIcon>
      )}
      {onEdit && (
        <ActionIcon onClick={onEdit}>
          <IconEdit size='1rem' />
        </ActionIcon>
      )}
      {onDelete && (
        <ActionIcon color='red' onClick={onDelete}>
          <IconTrash size='1rem' />
        </ActionIcon>
      )}
    </Group>
  );
}
