import { PageHeader } from '@component/PageHeader/PageHeader';
import { EExamCategory, EQuestionType } from '@enum/exam';
import { IQuestion, IResult } from '@interface/exam';
import { Button, Divider, Grid, Group, Paper, Stack, Text, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useFocusTrap, useListState } from '@mantine/hooks';
import { IconChevronLeft, IconChevronRight, IconHelpOctagon, IconPencil, IconPlus, IconTargetArrow } from '@tabler/icons-react';
import { SchemaUtils } from '@util/SchemaUtils';
import { TextUtils } from '@util/TextUtils';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { z } from 'zod';
import { QuestionCard, QuestionTypeModal } from '../components';
import { ResultCard } from '../components/ResultCard';
import { TextExamCategory, TextQuestionType } from '../utils';

const formSchema = z.object({
  //type: z.string().trim().min(1, SchemaUtils.message.nonempty),
  name: z.string().trim().min(1, SchemaUtils.message.nonempty),
  questions: z.array(
    z.object({
      questionTitle: z.string().trim().min(1, SchemaUtils.message.nonempty),
      questionType: z.nativeEnum(EQuestionType),
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
  results: z.array(
    z.object({
      score: z.array(z.number()).nonempty(SchemaUtils.message.nonempty),
      content: z.string().trim().min(1, SchemaUtils.message.nonempty),
      image: z.instanceof(File).nullable(),
      detail: z.string().trim().nullable(),
    }),
  ),
});
type FormValues = z.infer<typeof formSchema>;
const initialFormValues: FormValues = {
  name: '',
  questions: [],
  results: [],
};
export default function ExamCreatePage() {
  const focusTrapRef = useFocusTrap();
  const form = useForm({
    initialValues: initialFormValues,
    validate: zodResolver(formSchema),
  });
  const { allQuestionType } = useParams();

  const [questions, questionsHandler] = useListState<IQuestion>([]);
  const [results, resultsHandler] = useListState<IResult>([]);
  const [openQuestionTypeModal, setOpenQuestionTypeModal] = useState(false);

  const location = useLocation();
  const category = useMemo(() => {
    if (location?.pathname?.includes('system')) {
      return EExamCategory.SYSTEM;
    }
    if (location?.pathname?.includes('design')) {
      return EExamCategory.DESIGN;
    }
    return null;
  }, [location?.pathname]);

  // METHODS
  const onAddQuestion = (questionType: EQuestionType) => {
    if (!questionType) return;
    questionsHandler.append({
      id: TextUtils.slugize('new-question'),
      questionType: questionType,
      questionTitle: '',
      image: '',
      options: [],
    });
  };

  const onAddResult = () => {
    resultsHandler.append({
      id: TextUtils.slugize('new-result'),
      score: [],
      content: '',
      image: '',
      detail: '',
    });
  };

  const handleSubmit = form.onSubmit((formValues) => {
    console.log('formValues', formValues);
  });

  console.log('form error', form.errors);

  useEffect(() => {
    form.setFieldValue('questions', questions);
  }, [form, questions]);

  useEffect(() => {
    form.setFieldValue('results', results);
  }, [form, results]);

  return (
    <Stack my='1rem' mx='1rem'>
      <PageHeader
        title='Quản lý bài kiểm tra'
        leftSection={<IconPencil />}
        middleSection={
          <>
            <IconChevronRight size={'20'} />
            <Text size='xl' fw={500}>
              Thêm mới
            </Text>
          </>
        }
        rightSection={
          <Button
            leftSection={<IconChevronLeft size={'1.125rem'} />}
            component={Link}
            to={category === EExamCategory.SYSTEM ? '/exams/system' : '/exams/design'}
            variant='default'
          >
            Trở về
          </Button>
        }
      />

      <Paper withBorder shadow='sm' radius={'md'} p='md'>
        <Stack ref={focusTrapRef}>
          <Stack>
            <Grid>
              <Grid.Col span={{ sm: 12, lg: 4 }}>
                <TextInput withAsterisk label='Tên bài kiểm tra' data-autofocus {...form.getInputProps('name')} />
              </Grid.Col>
              <Grid.Col span={{ sm: 12, lg: 4 }}>
                <TextInput label='Thể loại chung' value={TextQuestionType[allQuestionType as EQuestionType]} disabled={true} />
              </Grid.Col>
              <Grid.Col span={{ sm: 12, lg: 4 }}>
                <TextInput label='Phân loại' value={TextExamCategory[category as EExamCategory]} disabled={true} />
              </Grid.Col>
            </Grid>
          </Stack>

          <Group gap={5} mt='md' mb={0}>
            <IconHelpOctagon />
            <Text fw={600}>Câu hỏi</Text>
          </Group>
          {questions?.length > 0 && (
            <Stack>
              {questions?.map((question, index) => (
                <QuestionCard
                  key={index}
                  id={question.id}
                  questionsHandler={questionsHandler}
                  position={index}
                  questionType={question.questionType!}
                />
              ))}
            </Stack>
          )}

          <Button
            variant='outline'
            onClick={() => {
              if (allQuestionType === EQuestionType.COMBINE) {
                setOpenQuestionTypeModal(true);
              } else {
                onAddQuestion(allQuestionType as EQuestionType);
              }
            }}
            leftSection={<IconPlus />}
          >
            Thêm câu hỏi
          </Button>

          <Divider variant='dotted' />

          <Group gap={5} mt='md' mb={0}>
            <IconTargetArrow />
            <Text fw={600}>Kết quả & nhận xét</Text>
          </Group>
          {results?.length > 0 && (
            <Stack>{results?.map((result, index) => <ResultCard key={index} index={index} result={result} resultsHandler={resultsHandler} />)}</Stack>
          )}

          <Button variant='outline' onClick={onAddResult} leftSection={<IconPlus />}>
            Thêm kết quả & nhận xét
          </Button>

          <Divider variant='dotted' />

          <Group justify='space-between'>
            <Button variant='default' onClick={() => {}}>
              Mặc định
            </Button>
            <Button onClick={() => handleSubmit()} disabled={!form.isDirty()}>
              Lưu
            </Button>
          </Group>
        </Stack>
      </Paper>
      <QuestionTypeModal
        opened={openQuestionTypeModal}
        onCancel={() => setOpenQuestionTypeModal(false)}
        onFinish={(questionType) => {
          onAddQuestion(questionType);
        }}
        questionTypeList={Object.keys(EQuestionType).slice(0, 3) as EQuestionType[]}
      />
    </Stack>
  );
}
