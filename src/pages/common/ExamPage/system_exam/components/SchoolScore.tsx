import AppSearch from '@component/AppSearch/AppSearch';
import AppTable from '@component/AppTable/AppTable';
import { Button, Group, Input, Modal, Stack, TextInput } from '@mantine/core';
import { schoolScoreDummyData } from '../../dummyData';
import { TableButton } from '@component/TableButton/TableButton';
type Props = {
  openCreateSubjectModal: boolean;
  setOpenCreateSubjectModal: (openCreateSubjectModal: boolean) => void;
};
export function SchoolScore({ openCreateSubjectModal, setOpenCreateSubjectModal }: Props) {
  return (
    <Stack>
      <AppSearch />
      <AppTable
        data={schoolScoreDummyData}
        columns={[
          {
            accessor: '_id',
            title: 'ID',
            width: 300,
          },
          {
            accessor: 'name',
            title: 'Tên biến',
            width: 300,
          },
          {
            accessor: 'vnName',
            title: 'Tên hiển thị',
            width: 300,
          },
          {
            accessor: 'actions',
            title: 'Thao tác',
            render: () => <TableButton onView={() => {}} onEdit={() => {}} onDelete={() => {}} />,
          },
        ]}
      />
      <Modal
        opened={openCreateSubjectModal}
        onClose={() => setOpenCreateSubjectModal(false)}
        centered
        size={'md'}
        title='Thêm môn học'
        styles={{
          title: {
            fontWeight: 500,
          },
        }}
      >
        <Stack>
          <TextInput withAsterisk label='Tên biến' />
          <TextInput withAsterisk label='Tên hiển thị' />
          <Group justify='flex-end'>
            <Button variant='default' onClick={() => setOpenCreateSubjectModal(false)}>
              Huỷ
            </Button>
            <Button
              onClick={() => {
                setOpenCreateSubjectModal(false);
              }}
            >
              Thêm
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
}
