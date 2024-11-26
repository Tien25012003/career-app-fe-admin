import { PageEditor } from '@component/PageEditor/PageEditor';
import { PageUploader } from '@component/PageUploader/PageUploader';
import { EQuestionType } from '@enum/exam';
import { EFileType } from '@enum/file.enum';
import { convertImageToBase64 } from '@helper/file.helpers';
import { isValidContentWithHTML } from '@helper/string.helpers';
import { IOption, IQuestion } from '@interface/exam';
import { Badge, Button, Divider, Grid, Group, Paper, Stack, Text } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { FormErrors } from '@mantine/form';
import { useListState, UseListStateHandlers } from '@mantine/hooks';
import { FileUtils } from '@util/FileUtils';
import { TextUtils } from '@util/TextUtils';
import { useEffect } from 'react';
import { IQuestionHandler } from '../create/ExamCreatePage';
import { ColorQuestionType, TextQuestionType } from '../utils';
import { OptionCard } from './OptionCard';

type Props = {
  id?: string;
  position: number;
  question: IQuestionHandler;
  questionsHandler: UseListStateHandlers<IQuestionHandler>;
  questionType: EQuestionType;
  errors?: FormErrors;
  index?: number;
  isCreate?: boolean;
  isView?: boolean;
  isEdit?: boolean;
};

export interface IOptionHandler extends IOption {
  imageFile?: File | null | undefined;
  imageBase64?: HTMLImageElement | null | undefined;
}

export function QuestionCard({
  id,
  position,
  questionType,
  questionsHandler,
  question,
  errors,
  index,
  isCreate = true,
  isView = false,
  isEdit = false,
}: Props) {
  // STATE
  const [options, optionsHandler] = useListState<IOptionHandler>([
    {
      id: TextUtils.slugize('new-option'),
      image: '',
      content: '',
      isResult: true,
      standardScore: undefined,
      imageFile: null,
      imageBase64: null,
    },
  ]);

  // METHODS
  const onDeleteQuestion = () => {
    questionsHandler?.filter((question) => question.id !== id);
  };

  const onAddOption = () => {
    optionsHandler.append({
      id: TextUtils.slugize('new-option'),
      image: '',
      content: '',
      isResult: false,
      standardScore: undefined,
      imageFile: null,
      imageBase64: null,
    });
  };

  const handleChangeQuestionImages = (files: File | FileWithPath | null) => {
    const file = Array.isArray(files) ? files[0] : files;

    if (file) {
      convertImageToBase64(file).then((result) => {
        const newImage = new Image();
        newImage.src = result as string;

        if (typeof result === 'string') {
          questionsHandler.applyWhere(
            (question) => question.id === id,
            (question) => ({ ...question, imageFile: file, imageBase64: newImage }),
          );
        }
      });
    } else {
      questionsHandler.applyWhere(
        (question) => question.id === id,
        (question) => ({ ...question, imageFile: null, imageBase64: null }),
      );
    }
  };

  const handleChangeQuestionValues = (attributeName: keyof IQuestion, value: any) => {
    questionsHandler.applyWhere(
      (question) => question.id === id,
      (question) => ({ ...question, [attributeName]: value }),
    );
  };

  // EFFECTS
  useEffect(() => {
    console.log('set option');
    questionsHandler.applyWhere(
      (question) => question.id === id,
      (question) => ({ ...question, options: options }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, options]);

  const fetchFilesForOptions = async () => {
    const optionsWithFiles = await Promise.all(
      question?.options.map(async (o, index) => {
        // Fetch the image file using imageKey URL
        console.log('index', index, o.image);
        let imageFile;
        if (o.image) {
          imageFile = await FileUtils.fetchFileFromPath(o.image as string);
        }
        return { ...o, imageFile: imageFile || null, imageKey: o.imageKey || null, imageBase64: null };
      }) || [],
    );
    optionsHandler.setState(optionsWithFiles);
  };

  // EFFECTS FOR DETAIL
  useEffect(() => {
    console.log('question card detail');
    if (isView || isEdit) {
      // if (question?.options) {
      //   fetchFilesForOptions();
      // }
      fetchFilesForOptions();
    }
  }, [isView, isEdit]);

  return (
    <Paper withBorder shadow='none' radius={'md'} p='md'>
      <Stack>
        <Group justify='space-between'>
          <Group>
            <Text fw={500}>Câu hỏi số {position + 1}</Text>
            <Badge color={ColorQuestionType(questionType)} variant='outline' radius={'xs'}>
              {TextQuestionType[questionType as EQuestionType]}
            </Badge>
          </Group>
          {isCreate && (
            <Button color='red' onClick={onDeleteQuestion}>
              Xoá câu hỏi
            </Button>
          )}
        </Group>
        <Divider variant='dotted' p={0} />
        <Grid>
          <Grid.Col span={{ sm: 12, lg: 6 }}>
            <PageEditor
              label='Câu hỏi'
              withAsterisk
              value={question?.questionTitle}
              editAble={isCreate || isEdit}
              initialValue={isCreate || isEdit ? '' : question?.questionTitle}
              onChange={(val) => {
                if (isValidContentWithHTML(val)) {
                  handleChangeQuestionValues('questionTitle', val);
                } else {
                  handleChangeQuestionValues('questionTitle', '');
                }
              }}
              error={(errors![`questions.${index}.questionTitle`] as string) || ''}
            />
          </Grid.Col>
          <Grid.Col span={{ sm: 12, lg: 6 }}>
            <PageUploader
              previewProps={{
                image: true,
                isLoading: false,
                height: 150,
              }}
              placeholder='Chọn hình'
              // withAsterisk
              label='Hình ảnh'
              clearable
              onChange={(file) => handleChangeQuestionImages(file)}
              value={question?.imageFile}
              accept={[EFileType.JPEG, EFileType.PNG].join(',')}
              disabled={isView}
            />
            {/* <PageDropZone
              onDrop={(files) => handleChangeQuestionImages(files as unknown as File)}
              previewProps={{ files: question.imageFile as FileWithPath, isLoading: false }}
              onClear={() => handleChangeQuestionImages(null)}
              label='Hình ảnh'
            /> */}
          </Grid.Col>
        </Grid>
        {options?.length > 0 && (
          <Stack>
            {options?.map((option, i) => (
              <OptionCard
                index={i}
                key={i}
                option={option}
                optionsHandler={optionsHandler}
                questionType={questionType}
                errors={errors}
                questionIndex={index}
                isCreate={isCreate}
                isView={isView}
                isEdit={isEdit}
              />
            ))}
          </Stack>
        )}

        {(isCreate || isEdit) && (
          <Group>
            <Button className='ml-auto' onClick={onAddOption}>
              Thêm lựa chọn
            </Button>
          </Group>
        )}
      </Stack>
    </Paper>
  );
}
