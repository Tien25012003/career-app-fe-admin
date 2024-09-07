import { PageHeader } from '@component/PageHeader/PageHeader';
import { ActionIcon, Box, Button, CheckIcon, Divider, Grid, Group, NumberInput, Paper, Radio, Stack, Text, Textarea, TextInput, Tooltip } from '@mantine/core';
import { useFocusTrap, useListState } from '@mantine/hooks';
import { IconChevronLeft, IconChevronRight, IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { TextExamType } from '../utils';
import { EQuestionType, IQuestion } from '@interface/exam';
import { z } from 'zod';
import { SchemaUtils } from '@util/SchemaUtils';
import { useForm, zodResolver } from '@mantine/form';
import { OptionCard } from '../components';
import { TextUtils } from '@util/TextUtils';

const formSchema = z.object({
  type: z.string().trim().min(1, SchemaUtils.message.nonempty),
  questionType: z.nativeEnum(EQuestionType),
  questions: z.array(
    z.object({
      questionTitle: z.string().trim().min(1, SchemaUtils.message.nonempty),
      image: z.instanceof(File).nullable(),
      options: z.array(
        z.object({
          image: z.instanceof(File).nullable(),
          content: z.string().trim().min(1, SchemaUtils.message.nonempty),
          isResult: z.boolean(),
        }),
      ),
    }),
  ),
});
type FormValues = z.infer<typeof formSchema>;
const initialFormValues: FormValues = {
  type: '',
  questionType: EQuestionType.MULTIPLE_CHOICE,
  questions: [],
};
export default function ExamMultipleChoiceCreatePage() {
  const focusTrapRef = useFocusTrap();
  const form = useForm({
    initialValues: initialFormValues,
    validate: zodResolver(formSchema),
  });

  const [questions, questionsHandler] = useListState<IQuestion>([]);

  const onAddQuestion = () => {
    questionsHandler.append({
      id: TextUtils.slugize('new-question'),
      questionTitle: '',
      image: '',
      options: [],
    });
  };

  return (
    <Stack my='1rem' mx='1rem'>
      <PageHeader
        title='Bài kiểm tra'
        leftSection={<IconPencil />}
        middleSection={
          <>
            <IconChevronRight size={'20'} />
            <Text size='xl' fw={500}>
              Thêm mới
            </Text>
            <IconChevronRight size={'20'} />
            <Text size='xl' fw={500}>
              Multiple Choice
            </Text>
          </>
        }
        rightSection={
          <Button leftSection={<IconChevronLeft size={'1.125rem'} />} component={Link} to={'/exams'} variant='default'>
            Trở về
          </Button>
        }
      />

      <Paper withBorder shadow='sm' radius={'md'} p='md'>
        <Stack ref={focusTrapRef}>
          <Stack>
            <Grid>
              <Grid.Col span={{ sm: 12, lg: 6 }}>
                <TextInput withAsterisk label='Tên bài kiểm tra' data-autofocus {...form.getInputProps('type')} />
              </Grid.Col>
              <Grid.Col span={{ sm: 12, lg: 6 }}>
                <TextInput label='Thể loại' value={TextExamType[EQuestionType.MULTIPLE_CHOICE]} disabled={true} />
              </Grid.Col>
            </Grid>
          </Stack>
          {questions?.length > 0 && (
            <Stack>
              {questions?.map((question, index) => (
                <OptionCard key={index} id={question.id} questionsHandler={questionsHandler} position={index} />
              ))}
            </Stack>
          )}

          <Button variant='outline' onClick={onAddQuestion} leftSection={<IconPlus />}>
            Thêm câu hỏi
          </Button>

          <Divider variant='dotted' />

          <Group justify='space-between'>
            <Button variant='default' onClick={() => {}}>
              Mặc định
            </Button>
            <Button onClick={() => {}}>Thêm</Button>
          </Group>
        </Stack>
      </Paper>
    </Stack>
  );
}
