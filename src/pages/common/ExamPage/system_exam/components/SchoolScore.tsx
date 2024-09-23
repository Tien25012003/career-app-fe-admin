import AppSearch from '@component/AppSearch/AppSearch';
import AppTable from '@component/AppTable/AppTable';
import { Button, Group, Input, Modal, Stack, TextInput } from '@mantine/core';
import { schoolScoreDummyData } from '../../dummyData';
import { TableButton } from '@component/TableButton/TableButton';
import { z } from 'zod';
import { SchemaUtils } from '@util/SchemaUtils';
import { useForm, zodResolver } from '@mantine/form';
type Props = {
  openCreateSubjectModal: boolean;
  setOpenCreateSubjectModal: (openCreateSubjectModal: boolean) => void;
};

const formSchema = z.object({
  name: z.string().trim().min(1, SchemaUtils.message.nonempty),
  vnName: z.string().trim().min(1, SchemaUtils.message.nonempty),
});
type FormValues = z.infer<typeof formSchema>;
const initialFormValues: FormValues = {
  name: '',
  vnName: '',
};
export function SchoolScore({ openCreateSubjectModal, setOpenCreateSubjectModal }: Props) {
  const form = useForm({
    initialValues: initialFormValues,
    validate: zodResolver(formSchema),
  });
  const handleSubmit = form.onSubmit((formValues) => {});
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
          <TextInput withAsterisk label='Tên biến' {...form.getInputProps('name')} />
          <TextInput withAsterisk label='Tên hiển thị' {...form.getInputProps('vnName')} />
          <Group justify='flex-end'>
            <Button variant='default' onClick={() => setOpenCreateSubjectModal(false)}>
              Huỷ
            </Button>
            <Button onClick={() => handleSubmit()} disabled={!form.isDirty()}>
              Thêm
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
}
