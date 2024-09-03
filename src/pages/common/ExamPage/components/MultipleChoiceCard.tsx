import { PageEditor } from '@component/PageEditor/PageEditor';
import { PageUploader } from '@component/PageUploader/PageUploader';
import { IOption, IQuestion } from '@interface/exam';
import { ActionIcon, Button, CheckIcon, Divider, Grid, Group, NumberInput, Paper, Radio, Stack, TextInput, Tooltip, Text } from '@mantine/core';
import { useListState, UseListStateHandlers } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import { TextUtils } from '@util/TextUtils';
type Props = {
  id?: string;
  position: number;
  questionsHandler: UseListStateHandlers<IQuestion>;
};
export function MultipleChoiceCard({ id, position, questionsHandler }: Props) {
  const [options, optionsHandler] = useListState<IOption>([]);
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

  const onDeleteOption = (id: string) => {
    optionsHandler?.filter((option) => option.id !== id);
  };

  console.log('options', options);
  return (
    <Paper withBorder shadow='none' radius={'md'} p='md'>
      <Stack>
        <Group justify='space-between'>
          <Text fw={500}>Câu hỏi số {position + 1}</Text>
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
        <Radio.Group>
          {options?.length > 0 && (
            <Stack>
              {options?.map((option, index) => (
                <Stack key={index}>
                  <Group>
                    <Radio
                      label={`Lựa chọn ${index + 1}`}
                      //label={option.isResult}
                      //value={option.id}
                      name='check'
                      value='check'
                      icon={CheckIcon}
                      checked={false}
                      // onClick={() => {
                      //   optionsHandler.applyWhere(
                      //     (item) => item.id === option.id,
                      //     (item) => ({
                      //       ...item,
                      //       isResult: !item.isResult,
                      //     }),
                      //   );
                      // }}
                    />
                    <Tooltip label='Xoá lựa chọn'>
                      <ActionIcon color='red.5' variant='subtle' onClick={() => onDeleteOption(option.id as string)}>
                        <IconTrash size='1.125rem' />
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                  <Divider variant='dotted' p={0} />
                  <Grid mt={-5} my={'md'}>
                    <Grid.Col span={{ sm: 12, lg: 6 }}>
                      <TextInput withAsterisk label='Nội dung' />
                    </Grid.Col>
                    <Grid.Col span={{ sm: 12, lg: 6 }}>
                      <NumberInput withAsterisk label='Điểm' />
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
                </Stack>
              ))}
            </Stack>
          )}
        </Radio.Group>
        <Group>
          <Button className='ml-auto' onClick={onAddOption}>
            Thêm lựa chọn
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
}
