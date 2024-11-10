import { PageEditor } from '@component/PageEditor/PageEditor';
import { PageUploader } from '@component/PageUploader/PageUploader';
import { EFileType } from '@enum/file.enum';
import { convertImageToBase64 } from '@helper/file.helpers';
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
  isCreate?: boolean;
};
export function ResultCard({ index, result, resultsHandler, errors, isCreate = true }: Props) {
  // METHODS
  const onDeleteResult = (id: string) => {
    resultsHandler?.filter((result) => result.id !== id);
  };

  const handleChangeResultImages = (files: File | FileWithPath | null) => {
    const file = Array.isArray(files) ? files[0] : files;

    if (file) {
      const fileReader = new FileReader();
      convertImageToBase64(file).then((imgResult) => {
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
          {isCreate && (
            <Tooltip label='Xoá lựa chọn'>
              <Button color='red' onClick={() => onDeleteResult(result.id as string)}>
                Xoá kết quả & nhận xét
              </Button>
            </Tooltip>
          )}
        </Group>
        <Grid>
          <Grid.Col span={{ sm: 12, lg: 6 }}>
            <NumberInput
              min={0}
              placeholder='0'
              label={'Từ điểm'}
              withAsterisk
              value={result?.scoreFrom}
              onChange={(val) => handleChangeResultValues('scoreFrom', Number(val))}
              styles={{
                input: {
                  color: 'black', // Forces text color to stay black
                },
              }}
              disabled={!isCreate}
              error={errors[`results.${index}.score.0`] ? 'Vui lòng không bỏ trống!' : ''}
            />
          </Grid.Col>
          <Grid.Col span={{ sm: 12, lg: 6 }}>
            <NumberInput
              withAsterisk
              label={'Đến điểm'}
              min={0}
              placeholder='0'
              value={result?.scoreTo}
              onChange={(val) => handleChangeResultValues('scoreTo', Number(val))}
              styles={{
                input: {
                  color: 'black', // Forces text color to stay black
                },
              }}
              disabled={!isCreate}
              error={errors[`results.${index}.score.1`] ? 'Vui lòng không bỏ trống!' : ''}
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
              editAble={isCreate}
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
              editAble={isCreate}
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
              disabled={!isCreate}
            />
          </Grid.Col>
        </Grid>
      </Stack>
    </Paper>
  );
}
