import { PageUploader } from '@component/PageUploader/PageUploader';
import { EQuestionType } from '@enum/exam';
import { EFileType } from '@enum/file.enum';
import { convertImageToBase64 } from '@helper/file.helpers';
import { IOption } from '@interface/exam';
import { ActionIcon, Checkbox, Divider, Grid, Group, NumberInput, Radio, Stack, Text, TextInput, Tooltip } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { FormErrors } from '@mantine/form';
import { UseListStateHandlers } from '@mantine/hooks';
import { IconArrowBadgeRight, IconTrash } from '@tabler/icons-react';
import { useCallback } from 'react';
import { IOptionHandler } from './QuestionCard';
type Props = {
  index: number;
  option: IOptionHandler;
  optionsHandler: UseListStateHandlers<IOptionHandler>;
  questionType: EQuestionType;
  errors?: FormErrors;
  questionIndex?: number;
  isCreate?: boolean;
};

export function OptionCard({ index, option, optionsHandler, questionType, errors, questionIndex, isCreate = true }: Props) {
  // METHODS
  const onDeleteOption = (id: string) => {
    optionsHandler?.filter((option) => option.id !== id);
  };

  const handelChangeOptionImage = (files: File | FileWithPath | null) => {
    const file = Array.isArray(files) ? files[0] : files;

    if (file) {
      convertImageToBase64(file).then((result) => {
        const newImage = new Image();
        newImage.src = result as string;

        if (typeof result === 'string') {
          optionsHandler.applyWhere(
            (item) => item.id === option.id,
            (item) => ({ ...item, imageFile: file, imageBase64: newImage }),
          );
        }
      });
    } else {
      optionsHandler.applyWhere(
        (item) => item.id === option.id,
        (item) => ({ ...item, imageFile: null, imageBase64: null }),
      );
    }
  };

  const handleChangeOptionValues = (attributeName: keyof IOption, value: any) => {
    optionsHandler.applyWhere(
      (item) => item.id === option.id,
      (item) => ({ ...item, [attributeName]: value }),
    );
  };

  const renderIcon = useCallback(() => {
    switch (questionType) {
      case EQuestionType.MULTIPLE_CHOICE:
        return (
          <Tooltip label='Tích chọn nếu đây là đáp án đúng'>
            <Radio
              disabled={!isCreate}
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
              disabled={!isCreate}
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
      <Group className='-mb-3 mt-2'>
        {renderIcon()}
        {isCreate && (
          <Tooltip label='Xoá lựa chọn'>
            <ActionIcon color='red.5' variant='subtle' onClick={() => onDeleteOption(option.id as string)}>
              <IconTrash size='1.125rem' />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
      <Divider variant='dotted' p={0} />
      <Grid mt={-5} my={'md'}>
        <Grid.Col span={{ sm: 12, lg: 6 }}>
          <TextInput
            withAsterisk
            styles={{
              input: {
                color: 'black', // Forces text color to stay black
              },
            }}
            label='Nội dung'
            value={option?.content}
            disabled={!isCreate}
            onChange={(val) => {
              //setContent(val.target.value);
              handleChangeOptionValues('content', val.target.value);
            }}
            error={errors![`questions.${questionIndex}.options.${index}.content`] || ''}
          />
        </Grid.Col>
        <Grid.Col span={{ sm: 12, lg: 6 }}>
          <NumberInput
            withAsterisk
            label='Điểm'
            min={0}
            placeholder='0'
            value={option?.standardScore}
            onChange={(val) => {
              handleChangeOptionValues('standardScore', Number(val));
            }}
            styles={{
              input: {
                color: 'black', // Forces text color to stay black
              },
            }}
            disabled={!isCreate}
            error={errors![`questions.${questionIndex}.options.${index}.standardScore`] || ''}
          />
        </Grid.Col>
        <Grid.Col span={{ sm: 12, lg: 6 }}>
          <PageUploader
            previewProps={{
              image: true,
              isLoading: false,
              height: 80,
            }}
            placeholder='Chọn hình'
            label='Hình ảnh'
            clearable
            value={option.imageFile}
            onChange={(file) => handelChangeOptionImage(file)}
            accept={[EFileType.JPEG, EFileType.PNG].join(',')}
            disabled={!isCreate}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
