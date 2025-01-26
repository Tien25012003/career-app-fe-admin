import { addConclusionAPI, deleteConclusionAPI, editConclusionAPI, getListConclusionAPI } from '@api/services/conclusion/conclusion.api';
import { AddConclusionREQ, ConclusionREQ } from '@api/services/conclusion/conclusion.request';
import { ConclusionRESP } from '@api/services/conclusion/conclusion.response';
import AppSearch from '@component/AppSearch/AppSearch';
import AppTable from '@component/AppTable/AppTable';
import { TableButton } from '@component/TableButton/TableButton';
import { EHolland, ESchoolScore } from '@enum/exam';
import { onError } from '@helper/error.helpers';
import { Button, Group, Modal, NumberInput, Radio, Stack, TagsInput, Textarea, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure, useFocusTrap } from '@mantine/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { NotifyUtils } from '@util/NotificationUtils';
import { SchemaUtils } from '@util/SchemaUtils';
import { QUERY_KEYS } from 'constants/query-key.constants';
import { useFilter } from 'hooks/useFilter';
import useInvalidate from 'hooks/useInvalidate';
import { DataTableColumn } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
import ConclusionFilterDrawer from '../../components/ConclusionFilterDrawer';

type Props = {
  openCreateConclusionModal: boolean;
  setOpenCreateConclusionModal: (openCreateConclusionModal: boolean) => void;
};

const formSchema = z.object({
  Holland: z.nativeEnum(EHolland),
  SchoolScore: z.nativeEnum(ESchoolScore),
  IQ: z.number().nullable(),
  EQ: z.number().nullable(),
  Field: z.string().min(1, SchemaUtils.message.nonempty),
  Jobs: z.array(z.string()).min(1, SchemaUtils.message.nonempty),
  Conclusion: z.string().min(1, SchemaUtils.message.nonempty),
});
type FormValues = z.infer<typeof formSchema>;
const initialFormValues: FormValues = {
  Holland: EHolland.R,
  SchoolScore: ESchoolScore.A,
  IQ: null,
  EQ: null,
  Field: '',
  Jobs: ['Cơ khí'],
  Conclusion: '',
};
export function Conclusion({ openCreateConclusionModal, setOpenCreateConclusionModal }: Props) {
  const focusTrapRef = useFocusTrap();
  const form = useForm({
    initialValues: initialFormValues,
    validate: zodResolver(formSchema),
  });

  const { queries, hasNone, onSearch, onReset, getPaginationConfigs } = useFilter<ConclusionREQ>();
  const invalidate = useInvalidate();

  const [selectedItem, setSelectedItem] = useState<ConclusionRESP | null>(null);
  const [opened, { open: openFilter, close: closeFilter }] = useDisclosure(false);

  // APIS
  const { data: conclusions, isFetching: isFetchingConclusion } = useQuery({
    queryKey: [QUERY_KEYS.CONCLUSION.LIST, queries],
    queryFn: () => getListConclusionAPI(queries),
    enabled: !hasNone,
  });

  const { mutate: addConclusionMutation, isPending: isAdding } = useMutation({
    mutationFn: (request: AddConclusionREQ) => addConclusionAPI(request),
    onSuccess: () => {
      invalidate({
        queryKey: [QUERY_KEYS.CONCLUSION.LIST],
      });
      NotifyUtils.success('Tạo mới thành công!');
      setOpenCreateConclusionModal(false);
      form.reset();
    },
    onError,
  });

  const { mutate: editConclusionMutation, isPending: isEditing } = useMutation({
    mutationFn: (request: AddConclusionREQ) => editConclusionAPI(selectedItem?._id as string, request),
    onSuccess: () => {
      invalidate({
        queryKey: [QUERY_KEYS.CONCLUSION.LIST],
      });
      NotifyUtils.success('Lưu thay đổi thành công!');
      setOpenCreateConclusionModal(false);
      form.reset();
      setSelectedItem(null);
    },
    onError,
  });

  const { mutate: deleteConclusionMutation, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteConclusionAPI(id),
    onSuccess: () => {
      invalidate({
        queryKey: [QUERY_KEYS.CONCLUSION.LIST],
      });
      NotifyUtils.success('Xoá kết luận thành công!');
    },
    onError,
  });

  // METHODS
  const handleSubmit = form.onSubmit((formValues) => {
    const request: AddConclusionREQ = {
      ...formValues,
      Jobs: formValues?.Jobs?.join('\n'),
      Type: '',
      Schools: '',
      IQ: formValues?.IQ?.toString() || '-',
      EQ: formValues?.EQ?.toString() || '-',
    };
    if (selectedItem) {
      editConclusionMutation(request);
    } else {
      addConclusionMutation(request);
    }
  });

  // EFFECTS
  useEffect(() => {
    if (selectedItem && openCreateConclusionModal) {
      form.setValues({
        ...selectedItem,
        Holland: selectedItem?.Holland as EHolland,
        SchoolScore: selectedItem?.SchoolScore as ESchoolScore,
        Jobs: selectedItem?.Jobs?.split('\n') || [],
        IQ: Number(selectedItem?.IQ),
        EQ: Number(selectedItem?.EQ),
      });
    }
  }, [selectedItem, openCreateConclusionModal]);

  const columns = useMemo<DataTableColumn<ConclusionRESP>[]>(
    () => [
      {
        accessor: '',
        title: 'STT',
        textAlign: 'center',
        render: (_, index) => <div>{index + 1}</div>,
        width: 50,
      },
      {
        accessor: '_id',
        title: 'ID',
      },
      {
        accessor: 'Holland',
        title: 'Holland',
        width: 80,
        textAlign: 'center',
      },
      {
        accessor: 'IQ',
        title: 'IQ',
        width: 100,
        textAlign: 'center',
      },
      {
        accessor: 'EQ',
        title: 'EQ',
        width: 100,
        textAlign: 'center',
      },
      {
        accessor: 'SchoolScore',
        title: 'Khối',
        width: 80,
        textAlign: 'center',
      },
      {
        accessor: 'Field',
        title: 'Lĩnh vực',
        width: 100,
      },
      {
        accessor: 'Jobs',
        title: 'Ngành nghề phù hợp',
        width: 300,
        render: (val) => <div style={{ whiteSpace: 'pre-wrap' }}>{val.Jobs}</div>,
      },
      {
        accessor: 'Conclusion',
        title: 'Kết luận chung',
        width: 300,
      },
      {
        accessor: 'actions',
        width: 100,
        title: 'Thao tác',
        render: (val) => (
          <TableButton
            onEdit={() => {
              setSelectedItem(val);
              setOpenCreateConclusionModal(true);
            }}
            onDelete={() => deleteConclusionMutation(val._id as string)}
            isConfirmDelete={true}
          />
        ),
      },
    ],
    [deleteConclusionMutation, setOpenCreateConclusionModal],
  );

  return (
    <Stack>
      <AppSearch onSearch={(val) => onSearch({ Field: val })} onReset={onReset} onFilter={openFilter} />
      <AppTable
        data={conclusions?.data || []}
        columns={columns}
        isLoading={isFetchingConclusion}
        paginationConfigs={getPaginationConfigs(conclusions?.pagination?.totalPages, conclusions?.pagination?.totalCounts)}
      />
      <Modal
        opened={openCreateConclusionModal}
        onClose={() => {
          setOpenCreateConclusionModal(false);
          form.reset();
          setSelectedItem(null);
        }}
        centered
        size={'md'}
        title='Thêm kết luận'
        styles={{
          title: {
            fontWeight: 500,
          },
        }}
      >
        <Stack ref={focusTrapRef}>
          <Radio.Group withAsterisk label='Holland' {...form.getInputProps('Holland')}>
            <Group gap={'2rem'} my='sm' wrap='wrap'>
              {Object.keys(EHolland)?.map((holland, index) => <Radio key={index} label={holland} value={holland} />)}
            </Group>
          </Radio.Group>
          <Radio.Group withAsterisk label='Khối thi' {...form.getInputProps('SchoolScore')}>
            <Group gap={'2rem'} my='sm' wrap='wrap'>
              {Object.keys(ESchoolScore)?.map((group, index) => <Radio key={index} label={group} value={group} />)}
            </Group>
          </Radio.Group>
          <Group>
            <NumberInput label='IQ' {...form.getInputProps('IQ')} placeholder='0' min={0} />
            <NumberInput label='EQ' {...form.getInputProps('EQ')} placeholder='0' min={0} />
          </Group>
          <TextInput withAsterisk label='Lĩnh vực' {...form.getInputProps('Field')} />
          <TagsInput withAsterisk label='Công việc thích hợp' {...form.getInputProps('Jobs')} clearable />
          <Textarea withAsterisk label='Kết luận' {...form.getInputProps('Conclusion')} autosize minRows={4} />
          <Group justify='flex-end'>
            <Button variant='default' onClick={() => setOpenCreateConclusionModal(false)}>
              Huỷ
            </Button>
            <Button onClick={() => handleSubmit()} loading={isAdding || isDeleting || isEditing}>
              {selectedItem ? 'Lưu thay đổi' : 'Thêm'}
            </Button>
          </Group>
        </Stack>
      </Modal>
      <ConclusionFilterDrawer
        opened={opened}
        onClose={closeFilter}
        onSubmitFilter={(value) => {
          onSearch(value);
        }}
        onResetFilter={onReset}
      />
    </Stack>
  );
}
