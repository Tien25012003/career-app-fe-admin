import { PageHeader } from '@component/PageHeader/PageHeader';
import { EExamCategory, EQuestionType } from '@enum/exam';
import { IOption, IQuestion, IResult } from '@interface/exam';
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
          image: z.string().trim().nullable(),
          imageFile: z.instanceof(File).nullable(),
          imageBase64: z.instanceof(HTMLImageElement).nullable(),
          content: z.string().trim().min(1, SchemaUtils.message.nonempty),
          isResult: z.boolean(),
          standardScore: z.number().min(0, { message: SchemaUtils.message.nonempty }),
        }),
      ),
    }),
  ),
  results: z.array(
    z.object({
      score: z.array(z.number()).min(2, { message: SchemaUtils.message.nonempty }), // This enforces that the array must have at least one element
      content: z.string().trim().min(1, SchemaUtils.message.nonempty),
      image: z.string().trim().nullable(),
      imageFile: z.instanceof(File).nullable(),
      imageBase64: z.instanceof(HTMLImageElement).nullable(),
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

export interface IQuestionHandler extends IQuestion {
  imageFile: File | null;
  imageBase64: HTMLImageElement | null;
  options: IOptionHandler[];
}

export interface IOptionHandler extends IOption {
  imageFile?: File | null | undefined;
  imageBase64?: HTMLImageElement | null | undefined;
}

export interface IResultHandler extends IResult {
  scoreFrom?: number;
  scoreTo?: number;
  imageFile?: File | null | undefined;
  imageBase64?: HTMLImageElement | null | undefined;
}

export default function ExamCreatePage() {
  const focusTrapRef = useFocusTrap();
  const form = useForm({
    initialValues: initialFormValues,
    validate: zodResolver(formSchema),
  });
  const { allQuestionType } = useParams();

  const [questions, questionsHandler] = useListState<IQuestionHandler>([]);
  const [results, resultsHandler] = useListState<IResultHandler>([]);
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
      imageFile: null,
      imageBase64: null,
    });
  };

  const onAddResult = () => {
    resultsHandler.append({
      id: TextUtils.slugize('new-result'),
      score: [],
      content: '',
      image: '',
      detail: '',
      imageFile: null,
      imageBase64: null,
    });
  };

  const handleSubmit = form.onSubmit((formValues) => {
    console.log('formValues', formValues);
  });

  // EFFECTS
  useEffect(() => {
    console.log('set question');
    form.setFieldValue(
      'questions',
      questions?.map((question) => ({
        questionTitle: question.questionTitle,
        questionType: question.questionType!,
        image: null,
        imageFile: question.imageFile,
        imageBase64: question.imageBase64,
        options: question.options as any,
      })),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  useEffect(() => {
    form.setFieldValue(
      'results',
      results?.map((result) => ({
        score: [result.scoreFrom as number, result.scoreTo as number],
        content: result?.content || '',
        detail: result?.detail || '',
        image: '',
        imageBase64: null,
        imageFile: null,
      })),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

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
                  question={question}
                  errors={form.errors}
                  index={index}
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
            <Stack>
              {results?.map((result, index) => (
                <ResultCard key={index} index={index} result={result} resultsHandler={resultsHandler} errors={form.errors} />
              ))}
            </Stack>
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
