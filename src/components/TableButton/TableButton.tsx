import { ActionIcon, Button, Group, Popover, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
type Props = {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isConfirmDelete?: boolean;
};
export function TableButton({ onView, onEdit, onDelete, isConfirmDelete = true }: Props) {
  const [opened, { toggle, close }] = useDisclosure(false);

  const handleDelete = () => {
    toggle();
  };
  return (
    <Group wrap='nowrap' gap={'xs'} align='center' justify='center'>
      {!!onView && (
        <ActionIcon variant='outline' onClick={onView}>
          <IconEye size='1rem' />
        </ActionIcon>
      )}
      {!!onEdit && (
        <ActionIcon onClick={onEdit}>
          <IconEdit size='1rem' />
        </ActionIcon>
      )}
      {!!onDelete && (
        <>
          {isConfirmDelete ? (
            <Stack>
              <Popover position='bottom' withArrow shadow='xl' opened={opened} withinPortal>
                <Popover.Target>
                  <ActionIcon color='red' onClick={handleDelete}>
                    <IconTrash size='1rem' />
                  </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown>
                  <Stack>
                    <Text size='md' fw={500}>
                      Xác nhận xoá
                    </Text>
                    <Text size='sm'>Bạn có chắc muốn xoá dữ liệu này?</Text>
                    <Group justify='flex-end'>
                      <Button variant='light' color='grey' onClick={() => close()}>
                        Huỷ
                      </Button>
                      <Button variant='light' color='red' onClick={() => onDelete?.()}>
                        Đồng ý
                      </Button>
                    </Group>
                  </Stack>
                </Popover.Dropdown>
              </Popover>
            </Stack>
          ) : (
            <ActionIcon color='red' onClick={onDelete}>
              <IconTrash size='1rem' />
            </ActionIcon>
          )}
        </>
      )}
    </Group>
  );
}
