import { ConclusionREQ } from '@api/services/conclusion/conclusion.request';
import { EHolland, ESchoolScore } from '@enum/exam';
import { Button, Drawer, Group, NumberInput, Radio, Stack, TagsInput, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

type ConclusionFilterProps = {
  opened?: boolean;
  onClose?: () => void;
  onSubmitFilter?: (value: ConclusionREQ) => void;
  onResetFilter?: () => void;
};

const formSchema = z.object({
  Holland: z.nativeEnum(EHolland).nullable(),
  SchoolScore: z.nativeEnum(ESchoolScore).nullable(),
  IQ: z.number().nullable(),
  EQ: z.number().nullable(),
  Field: z.string().min(0),
  Jobs: z.array(z.string()).min(0),
});
type FilterFormValues = z.infer<typeof formSchema>;
const initialFormValues: FilterFormValues = {
  Holland: null,
  SchoolScore: null,
  IQ: null,
  EQ: null,
  Field: '',
  Jobs: [],
};
export default function ConclusionFilterDrawer({ opened = false, onClose, onSubmitFilter, onResetFilter }: ConclusionFilterProps) {
  const form = useForm({
    initialValues: initialFormValues,
    validate: zodResolver(formSchema),
  });

  const handleSubmit = form.onSubmit((formValues) => {
    console.log('formValues', formValues);
    onSubmitFilter?.(formValues as unknown as ConclusionREQ);
    onClose?.();
  });
  return (
    <Drawer opened={opened} onClose={() => onClose?.()} title='Filter' position='right'>
      <Stack>
        <Radio.Group label='Holland' {...form.getInputProps('Holland')}>
          <Group gap={'2rem'} my='sm' wrap='wrap'>
            {Object.keys(EHolland)?.map((holland, index) => <Radio key={index} label={holland} value={holland} />)}
          </Group>
        </Radio.Group>
        <Radio.Group label='Khối thi' {...form.getInputProps('SchoolScore')}>
          <Group gap={'2rem'} my='sm' wrap='wrap'>
            {Object.keys(ESchoolScore)?.map((group, index) => <Radio key={index} label={group} value={group} />)}
          </Group>
        </Radio.Group>
        <Group>
          <NumberInput label='IQ' placeholder='0' {...form.getInputProps('IQ')} defaultValue={0} />
          <NumberInput label='EQ' placeholder='0' {...form.getInputProps('EQ')} defaultValue={0} />
        </Group>
        <TextInput label='Lĩnh vực' {...form.getInputProps('Field')} />
        <TagsInput label='Công việc thích hợp' {...form.getInputProps('Jobs')} clearable />
        <Group justify='space-between' className='flex-nowrap mt-4'>
          <Button
            variant='default'
            className='w-full'
            onClick={() => {
              onResetFilter?.();
              form.reset();
            }}
          >
            Reset
          </Button>
          <Button className='w-full' onClick={() => handleSubmit()}>
            Lọc
          </Button>
        </Group>
      </Stack>
    </Drawer>
  );
}
