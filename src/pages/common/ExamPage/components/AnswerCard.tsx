import { PageUploader } from '@component/PageUploader/PageUploader';
import { EQuestionType } from '@enum/exam';
import { IOption } from '@interface/exam';
import { ActionIcon, Checkbox, Divider, Grid, Group, NumberInput, Radio, Stack, TextInput, Tooltip, Text } from '@mantine/core';
import { UseListStateHandlers } from '@mantine/hooks';
import { IconArrowBadgeRight, IconTrash } from '@tabler/icons-react';
import { useCallback } from 'react';
type Props = {
  index: number;
  option: IOption;
  optionsHandler: UseListStateHandlers<IOption>;
  questionType: EQuestionType;
};
export function AnswerCard({ index, option, optionsHandler, questionType }: Props) {
  const onDeleteOption = (id: string) => {
    optionsHandler?.filter((option) => option.id !== id);
  };

  const renderIcon = useCallback(() => {
    switch (questionType) {
      case EQuestionType.MULTIPLE_CHOICE:
        return (
          <Tooltip label='Tích chọn nếu đây là đáp án đúng'>
            <Radio
              label={`Lựa chọn ${index + 1}`}
              name={option.id}
              value={option.id}
              //icon={CheckIcon}
              checked={option.isResult}
              onClick={() => {
                optionsHandler.applyWhere(
                  () => true, // Apply the update for all items
                  (item) => ({
                    ...item,
                    isResult: item.id === option.id, // Set isResult to true if item id matches the option id, otherwise false
                  }),
                );
              }}
            />
          </Tooltip>
        );
      case EQuestionType.TICK_BOX:
        return (
          <Tooltip label='Tích chọn nếu đây là đáp án đúng' withArrow>
            <Checkbox
              label={`Lựa chọn ${index + 1}`}
              name={option.id}
              value={option.id}
              checked={option.isResult}
              onChange={() => {
                optionsHandler.applyWhere(
                  (item) => item.id === option.id,
                  (item) => ({
                    ...item,
                    isResult: !option.isResult,
                  }),
                );
              }}
            />
          </Tooltip>
        );
      case EQuestionType.SHORT_ANSWER:
        return (
          <Group gap={0}>
            <IconArrowBadgeRight />
            <Text>{`Câu trả lời số ${index + 1}`}</Text>
          </Group>
        );
      default:
        return <></>;
    }
  }, [index, option.id, option.isResult, optionsHandler, questionType]);

  return (
    <Stack key={index}>
      <Group>
        {renderIcon()}
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
          <NumberInput withAsterisk label='Điểm' min={0} placeholder='0' />
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
  );
}
