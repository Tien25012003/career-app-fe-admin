import { PageEditor } from '@component/PageEditor/PageEditor';
import { PageUploader } from '@component/PageUploader/PageUploader';
import { EQuestionType } from '@enum/exam';
import { EFileType } from '@enum/file.enum';
import { IOption } from '@interface/exam';
import { Badge, Button, Divider, Grid, Group, Paper, Stack, Text } from '@mantine/core';
import { useListState, UseListStateHandlers } from '@mantine/hooks';
import { TextUtils } from '@util/TextUtils';
import { IQuestionHandler } from '../create/ExamCreatePage';
import { ColorQuestionType, TextQuestionType } from '../utils';
import { AnswerCard } from './AnswerCard';
type Props = {
  id?: string;
  position: number;
  question: IQuestionHandler;
  questionsHandler: UseListStateHandlers<IQuestionHandler>;
  questionType: EQuestionType;
};
export function QuestionCard({ id, position, questionType, questionsHandler, question }: Props) {
  const [options, optionsHandler] = useListState<IOption>([
    {
      id: TextUtils.slugize('new-option'),
      image: '',
      content: '',
      isResult: true,
      standardScore: 0,
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
      standardScore: 0,
    });
  };

  const handleChangeQuestionImages = (file: File | null) => {
    if (file) {
      const fileReader = new FileReader();
      new Promise((resolve) => {
        fileReader.onloadend = () => {
          resolve(fileReader.result);
        };
        fileReader.readAsDataURL(file);
      }).then((result) => {
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
          <Button color='red' onClick={onDeleteQuestion}>
            Xoá câu hỏi
          </Button>
        </Group>
        <Divider variant='dotted' p={0} />
        <Grid>
          <Grid.Col span={{ sm: 12, lg: 6 }}>
            <PageEditor label='Câu hỏi' withAsterisk />
          </Grid.Col>
          <Grid.Col span={{ sm: 12, lg: 6 }}>
            <PageUploader
              previewProps={{
                image: true,
                isLoading: false,
              }}
              placeholder='Chọn hình'
              // withAsterisk
              label='Hình ảnh'
              clearable
              onChange={(file) => handleChangeQuestionImages(file)}
              value={question?.imageFile}
              accept={[EFileType.JPEG, EFileType.PNG].join(',')}
            />
          </Grid.Col>
        </Grid>
        {options?.length > 0 && (
          <Stack>
            {options?.map((option, index) => (
              <AnswerCard index={index} option={option} optionsHandler={optionsHandler} questionType={questionType} />
            ))}
          </Stack>
        )}

        <Group>
          <Button className='ml-auto' onClick={onAddOption}>
            Thêm lựa chọn
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
}
