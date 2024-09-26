import AppSearch from '@component/AppSearch/AppSearch';
import AppTable from '@component/AppTable/AppTable';
import { Button, Group, Modal, NumberInput, Radio, Stack, TagsInput, Text, Textarea, TextInput } from '@mantine/core';
import { conclusionDummyData } from '../../dummyData';
import { z } from 'zod';
import { EHolland, ESchoolScore } from '@enum/exam';
import { SchemaUtils } from '@util/SchemaUtils';
import { useFocusTrap } from '@mantine/hooks';
import { useForm, zodResolver } from '@mantine/form';

type Props = {
  openCreateConclusionModal: boolean;
  setOpenCreateConclusionModal: (openCreateConclusionModal: boolean) => void;
};

const formSchema = z.object({
  Holland: z.nativeEnum(EHolland),
  SchoolScore: z.nativeEnum(ESchoolScore),
  IQ: z.number(),
  EQ: z.number(),
  Field: z.string().min(1, SchemaUtils.message.nonempty),
  Jobs: z.array(z.string().min(1, SchemaUtils.message.nonempty)),
  Conclusion: z.string().min(1, SchemaUtils.message.nonempty),
});
type FormValues = z.infer<typeof formSchema>;
const initialFormValues: FormValues = {
  Holland: EHolland.R,
  SchoolScore: ESchoolScore.A,
  IQ: 0,
  EQ: 0,
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
  const handleSubmit = form.onSubmit((formValues) => {});
  return (
    <Stack>
      <AppSearch />
      <AppTable
        data={conclusionDummyData}
        columns={[
          {
            accessor: 'Type',
            title: 'Thứ tự',
            width: 50,
            textAlign: 'center',
          },
          {
            accessor: 'Holland',
            title: 'Holland',
            width: 50,
            textAlign: 'center',
          },
          {
            accessor: 'IQ',
            title: 'IQ',
            width: 50,
            textAlign: 'center',
          },
          {
            accessor: 'EQ',
            title: 'EQ',
            width: 50,
            textAlign: 'center',
          },
          {
            accessor: 'SchoolScore',
            title: 'Khối',
            width: 50,
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
        ]}
      />
      <Modal
        opened={openCreateConclusionModal}
        onClose={() => {
          setOpenCreateConclusionModal(false);
          form.reset();
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
            <NumberInput withAsterisk label='IQ' {...form.getInputProps('IQ')} />
            <NumberInput withAsterisk label='EQ' {...form.getInputProps('EQ')} />
          </Group>
          <TextInput withAsterisk label='Lĩnh vực' {...form.getInputProps('Field')} />
          <TagsInput withAsterisk label='Công việc thích hợp' {...form.getInputProps('Jobs')} clearable />
          <Textarea withAsterisk label='Kết luận' {...form.getInputProps('Conclusion')} autosize />
          <Group justify='flex-end'>
            <Button variant='default' onClick={() => setOpenCreateConclusionModal(false)}>
              Huỷ
            </Button>
            <Button onClick={() => handleSubmit()}>Thêm</Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
}
