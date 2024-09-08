import { PageEditor } from '@component/PageEditor/PageEditor';
import { PageUploader } from '@component/PageUploader/PageUploader';
import { EQuestionType, IOption, IQuestion } from '@interface/exam';
import { Button, Divider, Grid, Group, Paper, Stack, Text, Badge } from '@mantine/core';
import { useListState, UseListStateHandlers } from '@mantine/hooks';
import { TextUtils } from '@util/TextUtils';
import { ColorQuestionType, TextQuestionType } from '../utils';
import { AnswerCard } from './AnswerCard';
type Props = {
  id?: string;
  position: number;
  questionsHandler: UseListStateHandlers<IQuestion>;
  questionType: EQuestionType;
};
export function QuestionCard({ id, position, questionType, questionsHandler }: Props) {
  const [options, optionsHandler] = useListState<IOption>([
    {
      id: TextUtils.slugize('new-option'),
      image: '',
      content: '',
      isResult: true,
      standardScore: 0,
    },
  ]);
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
                image: false,
                isLoading: false,
              }}
              placeholder='Chọn hình'
              withAsterisk
              label='Hình ảnh'
              clearable
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
