import { addSubjectAPI, deleteSubjectAPI, editSubjectAPI, getSchoolSubjectsAPI } from '@api/services/subject/subject.api';
import { SubjectREQ } from '@api/services/subject/subject.request';
import { SubjectRESP } from '@api/services/subject/subject.response';
import AppSearch from '@component/AppSearch/AppSearch';
import AppTable from '@component/AppTable/AppTable';
import { TableButton } from '@component/TableButton/TableButton';
import { onError } from '@helper/error.helpers';
import { Button, Group, Modal, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { NotifyUtils } from '@util/NotificationUtils';
import { SchemaUtils } from '@util/SchemaUtils';
import { QUERY_KEYS } from 'constants/query-key.constants';
import { useFilter } from 'hooks/useFilter';
import useInvalidate from 'hooks/useInvalidate';
import { DataTableColumn } from 'mantine-datatable';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
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
  // STATES
  const [selectedItem, setSelectedItem] = useState<SubjectRESP | null>(null);

  const form = useForm({
    initialValues: initialFormValues,
    validate: zodResolver(formSchema),
  });

  const { queries, hasNone, onSearch, onReset, getPaginationConfigs } = useFilter<SubjectREQ>();
  const invalidate = useInvalidate();

  // APIS
  const { data: subjects, isFetching: isFetchingSubjects } = useQuery({
    queryKey: [QUERY_KEYS.SCHOOL_SUBJECT.LIST, queries],
    queryFn: () => getSchoolSubjectsAPI(queries),
    enabled: !hasNone,
  });

  const { mutate: addSubjectMutation, isPending: isAdding } = useMutation({
    mutationFn: (request: SubjectREQ[]) => addSubjectAPI(request),
    onSuccess: () => {
      invalidate({
        queryKey: [QUERY_KEYS.SCHOOL_SUBJECT.LIST],
      });
      NotifyUtils.success('Tạo mới môn học mới thành công!');
      setOpenCreateSubjectModal(false);
      form.reset();
    },
    onError,
  });

  const { mutate: deleteSubjectMutation, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteSubjectAPI(id),
    onSuccess: () => {
      invalidate({
        queryKey: [QUERY_KEYS.SCHOOL_SUBJECT.LIST],
      });
      NotifyUtils.success('Xoá môn học thành công!');
    },
    onError,
  });

  const { mutate: editSubjectMutation, isPending: isEditing } = useMutation({
    mutationFn: (request: SubjectREQ) => editSubjectAPI(selectedItem?._id as string, request),
    onSuccess: () => {
      invalidate({
        queryKey: [QUERY_KEYS.SCHOOL_SUBJECT.LIST],
      });
      NotifyUtils.success('Sửa môn học thành công!');
      setOpenCreateSubjectModal(false);
      setSelectedItem(null);
      form.reset();
    },
    onError,
  });

  // METHODS
  const handleSubmit = form.onSubmit((formValues) => {
    if (selectedItem?._id) {
      const request: SubjectREQ = formValues;
      editSubjectMutation(request);
      return;
    }
    const request: SubjectREQ[] = [formValues];
    addSubjectMutation(request);
  });

  const handleDelete = useCallback(
    (id: string) => {
      deleteSubjectMutation(id);
    },
    [deleteSubjectMutation],
  );

  const columns = useMemo<DataTableColumn<SubjectRESP>[]>(
    () => [
      {
        accessor: '',
        title: 'STT',
        textAlign: 'center',
        render: (_, index) => <div>{index + 1}</div>,
      },
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
        render: (val) => (
          <TableButton
            onEdit={() => {
              setSelectedItem(val);
              setOpenCreateSubjectModal(true);
            }}
            onDelete={() => handleDelete(val._id)}
          />
        ),
      },
    ],
    [handleDelete],
  );

  // EFFECTS
  useEffect(() => {
    if (openCreateSubjectModal && selectedItem) {
      form.setValues(selectedItem);
    }
  }, [openCreateSubjectModal, selectedItem]);
  return (
    <Stack>
      <AppSearch onSearch={(val) => onSearch({ vnName: val })} onReset={onReset} />
      <AppTable
        data={subjects?.data || []}
        columns={columns}
        isLoading={isFetchingSubjects || isAdding || isDeleting}
        paginationConfigs={getPaginationConfigs(subjects?.pagination?.totalPages, subjects?.pagination?.totalCounts)}
      />
      <Modal
        opened={openCreateSubjectModal}
        onClose={() => {
          setOpenCreateSubjectModal(false);
          setSelectedItem(null);
        }}
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
            <Button onClick={() => handleSubmit()} disabled={!form.isDirty()} loading={isAdding || isEditing}>
              {selectedItem ? 'Lưu thay đổi' : 'Thêm'}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
}
