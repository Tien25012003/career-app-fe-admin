import { addExamAPI, editExamAPI, getExamDetailAPI } from '@api/services/exam/exam.api';
import { AddExamREQ, EditExamREQ } from '@api/services/exam/exam.request';
import { UploadRESP } from '@api/services/uploads/upload.response';
import { uploadAPI } from '@api/services/uploads/uploads.api';
import { PageHeader } from '@component/PageHeader/PageHeader';
import { EExamCategory, EExamStatus, EQuestionType } from '@enum/exam';
import { onError } from '@helper/error.helpers';
import { IOption, IQuestion, IResult } from '@interface/exam';
import { Box, Button, Divider, Grid, Group, Loader, Paper, Stack, Text, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useFocusTrap, useListState } from '@mantine/hooks';
import { IconChevronLeft, IconChevronRight, IconHelpOctagon, IconPencil, IconPlus, IconTargetArrow } from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FileUtils } from '@util/FileUtils';
import { NotifyUtils } from '@util/NotificationUtils';
import { SchemaUtils } from '@util/SchemaUtils';
import { TextUtils } from '@util/TextUtils';
import { QUERY_KEYS } from 'constants/query-key.constants';
import { ROUTES } from 'constants/routes.constants';
import useInvalidate from 'hooks/useInvalidate';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { QuestionCard, QuestionTypeModal } from '../components';
import { ResultCard } from '../components/ResultCard';
import { TextExamCategory } from '../utils';

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
  imageFile?: File | null;
  imageBase64?: HTMLImageElement | null;
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
  const { allQuestionType, id } = useParams();

  const [questions, questionsHandler] = useListState<IQuestionHandler>([]);
  const [results, resultsHandler] = useListState<IResultHandler>([]);
  const [openQuestionTypeModal, setOpenQuestionTypeModal] = useState(false);
  const [isUploadingFiles, setIsUploadingFiles] = useState(false);

  const navigate = useNavigate();

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

  const invalidate = useInvalidate();

  // APIS
  const { mutate: addExamMutation, isPending: isAddingExam } = useMutation({
    mutationFn: (request: AddExamREQ) => addExamAPI(request),
    onSuccess: () => {
      invalidate({
        queryKey: [QUERY_KEYS.EXAM.DESIGN_LIST],
      });
      NotifyUtils.success('Tạo bài kiểm tra mới thành công!');
      form.reset();
      navigate(category === EExamCategory.SYSTEM ? ROUTES.EXAMS.SYSTEM : ROUTES.EXAMS.DESIGN);
    },
    onError,
  });

  // APIS GET DETAILS
  const { data: detail, isFetching: isFetchingDetail } = useQuery({
    queryKey: [QUERY_KEYS.CHAT_BOT.LIST, id],
    queryFn: () => getExamDetailAPI(id!),
    enabled: !!id,
    select: ({ data }) => data,
  });

  // APIS EDIT EXAM
  const { mutate: editExamMutation, isPending: isEditingExam } = useMutation({
    mutationFn: (request: EditExamREQ) => editExamAPI(id as string, request),
    onSuccess: () => {
      invalidate({
        queryKey: [QUERY_KEYS.EXAM.DESIGN_LIST, id],
      });
      NotifyUtils.success('Sửa bài kiểm tra mới thành công!');
      //form.reset();
      //navigate(category === EExamCategory.SYSTEM ? ROUTES.EXAMS.SYSTEM : ROUTES.EXAMS.DESIGN);
    },
    onError,
  });

  const isCreate = useMemo(() => !id, [id]);

  const isView = useMemo(() => !!id && !location?.pathname?.includes('edit'), [id, location?.pathname]);

  const isEdit = useMemo(() => !!id && location?.pathname?.includes('edit'), [id, location?.pathname]);

  const isLoading = useMemo(() => isUploadingFiles || isAddingExam || isFetchingDetail, [isAddingExam, isFetchingDetail, isUploadingFiles]);

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

  const handleUploadQuestionImages = async (questions: IQuestionHandler[]) => {
    const uploadPromises = questions?.map(async (question) => {
      const questionFormData = new FormData();

      // Check if question image exists and upload if it does
      let questionImageResp: UploadRESP = {
        url: null,
        key: null,
      };
      if (question?.imageFile) {
        questionFormData.append('file', question?.imageFile);
        questionFormData.append('folderName', 'exam');
        const questionResponse = await uploadAPI(questionFormData);
        questionImageResp = questionResponse.data;
      }

      // Prepare options for the current question
      const optionsPromises = question?.options?.map(async (option) => {
        const optionFormData = new FormData();
        let optionImageResp: UploadRESP = {
          url: null,
          key: null,
        };

        if (option?.imageFile) {
          optionFormData.append('file', option.imageFile);
          optionFormData.append('folderName', 'exam');
          const optionResponse = await uploadAPI(optionFormData);
          optionImageResp = optionResponse.data;
        }

        return {
          ...option,
          image: optionImageResp.url,
          imageKey: optionImageResp.key,
        };
      });

      // Wait for all option uploads to complete
      const uploadedOptions = await Promise.all(optionsPromises);

      return {
        ...question,
        image: questionImageResp.url,
        imageKey: questionImageResp.key,
        options: uploadedOptions,
      };
    });

    return await Promise.all(uploadPromises);
  };

  const handleUploadResultImages = async (results: IResultHandler[]) => {
    const uploadPromises = results?.map(async (item) => {
      let resultImageResp: UploadRESP = {
        url: null,
        key: null,
      };
      if (item?.imageFile) {
        const resultFormData = new FormData();
        resultFormData.append('file', item?.imageFile);
        resultFormData.append('folderName', 'exam');
        const resultResponse = await uploadAPI(resultFormData);
        resultImageResp = resultResponse?.data;
      }

      return { ...item, image: resultImageResp.url, imageKey: resultImageResp.key };
    });

    return Promise.all(uploadPromises);
  };

  // SUBMITS
  const handleSubmit = form.onSubmit(async (formValues) => {
    console.log('formValues', formValues);
    setIsUploadingFiles(true);
    try {
      // Upload Questions
      const uploadedQuestionImages = await handleUploadQuestionImages(formValues.questions as IQuestionHandler[]);
      form.setFieldValue('questions', uploadedQuestionImages as any);

      // Upload Results
      const uploadResultImages = await handleUploadResultImages(formValues.results as IResult[]);
      form.setFieldValue('results', uploadResultImages as any);

      // Request
      const requestedQuestions: IQuestion[] = (uploadedQuestionImages as IQuestionHandler[])?.map((item) => ({
        questionTitle: item.questionTitle,
        questionType: item.questionType,
        image: item.image,
        imageKey: item.imageKey,
        options: item?.options?.map((option: IOption) => ({
          content: option.content,
          isResult: option.isResult,
          image: option.image,
          imageKey: option.imageKey,
          standardScore: option.standardScore,
        })),
      }));

      const requestedResults: IResult[] = (uploadResultImages as IResultHandler[])?.map((item) => ({
        score: (item.score as number[]) || null,
        content: item.content,
        detail: item.detail,
        image: item.image || null,
        imageKey: item.imageKey || null,
      }));

      const request: AddExamREQ = {
        name: formValues.name,
        type: null,
        category: category || EExamCategory.DESIGN,
        status: EExamStatus.UNACTIVATED,
        questions: requestedQuestions,
        results: requestedResults,
      };

      console.log('REQUEST', request);

      if (isCreate) {
        addExamMutation(request);
        return;
      }

      if (isEdit) {
        editExamMutation(request);
        return;
      }
    } catch (error) {
      console.log('error add exam', error);
      NotifyUtils.error('Lỗi upload hình ảnh!');
      setIsUploadingFiles(false);
    } finally {
      setIsUploadingFiles(false);
    }

    // console.log('processedForm', form.getValues());
  });

  const onReset = () => {
    form.reset();
    questionsHandler.setState([]);
    resultsHandler.setState([]);
  };

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
        image: null,
        imageBase64: result?.imageBase64 || null,
        imageFile: result?.imageFile || null,
      })),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  //console.log('question', questions);

  // EFFECTS FOR DETAILS

  const fetchFilesForQuestions = async () => {
    const questionsWithFiles = await Promise.all(
      detail?.questions?.map(async (q) => {
        // Fetch the image file using imageKey URL
        let imageFile;
        if (q.image) {
          imageFile = await FileUtils.fetchFileFromPath(q.image as string);
        }
        return { ...q, imageFile: imageFile || null, imageKey: q.imageKey || null, imageBase64: null };
      }) || [],
    );
    questionsHandler.setState(questionsWithFiles);
  };

  const fetchFilesForResults = async () => {
    const resultsWithFiles = await Promise.all(
      detail?.results?.map(async (r) => {
        // Fetch the image file using imageKey URL
        let imageFile;
        if (r.image) {
          imageFile = await FileUtils.fetchFileFromPath(r.image as string);
        }
        return {
          ...r,
          imageFile: imageFile || null,
          imageKey: r.imageKey || null,
          scoreFrom: r.score?.[0] || 0,
          scoreTo: r.score?.[1] || 0,
          imageBase64: null,
        };
      }) || [],
    );
    resultsHandler.setState(resultsWithFiles || []);
  };

  useEffect(() => {
    console.log('set detail');
    if (id) {
      if (detail) {
        form.setFieldValue('name', detail?.name || '');
        fetchFilesForQuestions();
        fetchFilesForResults();
      }
    }
  }, [detail, id]);

  console.log('form', form.errors);
  console.log('form value', form.getValues());

  return (
    <Stack my='1rem' mx='1rem'>
      <PageHeader
        title='Quản lý bài kiểm tra'
        leftSection={<IconPencil />}
        middleSection={
          <>
            <IconChevronRight size={'20'} />
            <Text size='xl' fw={500}>
              {id ? id : `Thêm mới`}
            </Text>
          </>
        }
        rightSection={
          <Button
            leftSection={<IconChevronLeft size={'1.125rem'} />}
            component={Link}
            to={category === EExamCategory.SYSTEM ? '/exams/system' : '/exams/design'}
            variant='default'
            replace
          >
            Trở về
          </Button>
        }
      />

      <Paper withBorder shadow='sm' radius={'md'} p='md' className='relative'>
        <Stack ref={isCreate ? focusTrapRef : null}>
          <Stack>
            <Grid>
              <Grid.Col span={{ sm: 12, lg: 6 }}>
                <TextInput
                  withAsterisk
                  label='Tên bài kiểm tra'
                  data-autofocus
                  {...form.getInputProps('name')}
                  disabled={isView}
                  styles={{
                    input: {
                      color: 'black', // Forces text color to stay black
                    },
                  }}
                />
              </Grid.Col>
              {/* <Grid.Col span={{ sm: 12, lg: 4 }}>
                <TextInput label='Thể loại chung' value={TextQuestionType[allQuestionType as EQuestionType]} disabled={true} />
              </Grid.Col> */}
              <Grid.Col span={{ sm: 12, lg: 6 }}>
                <TextInput
                  label='Phân loại'
                  value={TextExamCategory[category as EExamCategory]}
                  disabled={true}
                  styles={{
                    input: {
                      color: 'black', // Forces text color to stay black
                    },
                  }}
                />
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
                  isCreate={isCreate}
                  isView={isView}
                  isEdit={isEdit}
                />
              ))}
            </Stack>
          )}

          {(isCreate || isEdit) && (
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
          )}

          <Divider variant='dotted' />

          <Group gap={5} mt='md' mb={0}>
            <IconTargetArrow />
            <Text fw={600}>Kết quả & nhận xét</Text>
          </Group>
          {results?.length > 0 && (
            <Stack>
              {results?.map((result, index) => (
                <ResultCard
                  key={index}
                  index={index}
                  result={result}
                  resultsHandler={resultsHandler}
                  errors={form.errors}
                  isCreate={isCreate}
                  isEdit={isEdit}
                  isView={isView}
                />
              ))}
            </Stack>
          )}

          {(isCreate || isEdit) && (
            <Button variant='outline' onClick={onAddResult} leftSection={<IconPlus />}>
              Thêm kết quả & nhận xét
            </Button>
          )}

          <Divider variant='dotted' />

          {isCreate && (
            <Group justify='space-between'>
              <Button variant='default' onClick={onReset}>
                Mặc định
              </Button>
              <Button onClick={() => handleSubmit()} disabled={!form.isDirty()} loading={isLoading}>
                Lưu
              </Button>
            </Group>
          )}

          {isEdit && (
            <Group justify='flex-end'>
              <Button onClick={() => handleSubmit()} disabled={!form.isDirty()} loading={isLoading}>
                Lưu thay đổi
              </Button>
            </Group>
          )}

          {isView && (
            <Group justify='flex-end'>
              <Button onClick={() => {}} loading={isLoading}>
                Chuyển đến trang Edit
              </Button>
            </Group>
          )}
        </Stack>
        {isLoading && (
          <Box className='absolute left-0 right-0 top-0 bottom-0 bg-white opacity-70 rounded-md items-center justify-center flex'>
            <Loader />
          </Box>
        )}
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
