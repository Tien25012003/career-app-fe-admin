import { PageEditor } from '@component/PageEditor/PageEditor';
import { PageUploader } from '@component/PageUploader/PageUploader';
import { EFileType } from '@enum/file.enum';
import { isValidContentWithHTML } from '@helper/string.helpers';
import { Button, Grid, Group, NumberInput, Paper, Stack, Text, Tooltip } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { FormErrors } from '@mantine/form';
import { UseListStateHandlers } from '@mantine/hooks';
import { IResultHandler } from '../create/ExamCreatePage';

type Props = {
  index: number;
  result: IResultHandler;
  resultsHandler: UseListStateHandlers<IResultHandler>;
  errors: FormErrors;
};
export function ResultCard({ index, result, resultsHandler, errors }: Props) {
  // METHODS
  const onDeleteResult = (id: string) => {
    resultsHandler?.filter((result) => result.id !== id);
  };

  const handleChangeResultImages = (files: File | FileWithPath | null) => {
    const file = Array.isArray(files) ? files[0] : files;

    if (file) {
      const fileReader = new FileReader();
      new Promise((resolve) => {
        fileReader.onloadend = () => {
          resolve(fileReader.result);
        };
        fileReader.readAsDataURL(file);
      }).then((imgResult) => {
        const newImage = new Image();
        newImage.src = imgResult as string;

        if (typeof imgResult === 'string') {
          resultsHandler.applyWhere(
            (item) => item.id === result.id,
            (item) => ({ ...item, imageFile: file, imageBase64: newImage }),
          );
        }
      });
    } else {
      resultsHandler.applyWhere(
        (item) => item.id === result.id,
        (item) => ({ ...item, imageFile: null, imageBase64: null }),
      );
    }
  };

  const handleChangeResultValues = (attributeName: keyof IResultHandler, value: any) => {
    resultsHandler.applyWhere(
      (item) => item.id === result.id,
      (item) => ({ ...item, [attributeName]: value }),
    );
  };

  return (
    <Paper withBorder shadow='none' radius={'md'} p='md'>
      <Stack>
        <Group justify='space-between'>
          <Text fw={500}>Kết quả & nhận xét số {index + 1}</Text>
          <Tooltip label='Xoá lựa chọn'>
            <Button color='red' onClick={() => onDeleteResult(result.id as string)}>
              Xoá kết quả & nhận xét
            </Button>
          </Tooltip>
        </Group>
        <Grid>
          <Grid.Col span={{ sm: 12, lg: 6 }}>
            <NumberInput
              min={0}
              placeholder='0'
              label={'Từ điểm'}
              withAsterisk
              value={result?.scoreFrom === 0 ? '' : result?.scoreFrom}
              onChange={(val) => handleChangeResultValues('scoreFrom', Number(val))}
              error={errors[`results.${index}.score.0`] ? 'Vui lòng không bỏ trống!' : ''}
              styles={{
                input: {
                  color: 'black', // Forces text color to stay black
                },
              }}
            />
          </Grid.Col>
          <Grid.Col span={{ sm: 12, lg: 6 }}>
            <NumberInput
              min={0}
              placeholder='0'
              label={'Đến điểm'}
              withAsterisk
              value={result?.scoreTo === 0 ? '' : result?.scoreTo}
              onChange={(val) => handleChangeResultValues('scoreTo', Number(val))}
              error={errors[`results.${index}.score.1`] ? 'Vui lòng không bỏ trống!' : ''}
              styles={{
                input: {
                  color: 'black', // Forces text color to stay black
                },
              }}
            />
          </Grid.Col>
          <Grid.Col span={{ sm: 12, lg: 6 }}>
            <PageEditor
              label='Nhận xét chung'
              withAsterisk
              value={result.content}
              onChange={(val) => {
                if (isValidContentWithHTML(val)) {
                  handleChangeResultValues('content', val);
                } else {
                  handleChangeResultValues('content', '');
                }
              }}
              error={(errors[`results.${index}.content`] as string) || ''}
            />
          </Grid.Col>
          <Grid.Col span={{ sm: 12, lg: 6 }}>
            <PageEditor
              label='Nhận xét chi tiết'
              value={result.detail}
              onChange={(val) => {
                if (isValidContentWithHTML(val)) {
                  handleChangeResultValues('detail', val);
                } else {
                  handleChangeResultValues('detail', '');
                }
              }}
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
              //withAsterisk
              label='Hình ảnh'
              clearable
              accept={[EFileType.JPEG, EFileType.PNG].join(',')}
              value={result?.imageFile}
              onChange={(file) => handleChangeResultImages(file)}
            />
          </Grid.Col>
        </Grid>
      </Stack>
    </Paper>
  );
}
