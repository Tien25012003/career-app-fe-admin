import { PageEditor } from '@component/PageEditor/PageEditor';
import { PageUploader } from '@component/PageUploader/PageUploader';
import { IResult } from '@interface/exam';
import { ActionIcon, Grid, Group, NumberInput, Paper, Stack, Text, Tooltip } from '@mantine/core';
import { UseListStateHandlers } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';

type Props = {
  index: number;
  result: IResult;
  resultsHandler: UseListStateHandlers<IResult>;
};
export function ResultCard({ index, result, resultsHandler }: Props) {
  const onDeleteResult = (id: string) => {
    resultsHandler?.filter((result) => result.id !== id);
  };
  return (
    <Paper withBorder shadow='none' radius={'md'} p='md'>
      <Stack>
        <Group>
          <Text fw={500}>Kết quả & nhận xét số {index + 1}</Text>
          <Tooltip label='Xoá lựa chọn'>
            <ActionIcon color='red.5' variant='subtle' onClick={() => onDeleteResult(result.id as string)}>
              <IconTrash size='1.125rem' />
            </ActionIcon>
          </Tooltip>
        </Group>
        <Grid>
          <Grid.Col span={{ sm: 12, lg: 6 }}>
            <Stack>
              <Grid>
                <Grid.Col span={{ sm: 12, lg: 6 }}>
                  <NumberInput label={'Từ điểm'} withAsterisk />
                </Grid.Col>
                <Grid.Col span={{ sm: 12, lg: 6 }}>
                  <NumberInput label={'Đến điểm'} withAsterisk />
                </Grid.Col>
              </Grid>
              <PageEditor label='Nhận xét chung' withAsterisk />
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ sm: 12, lg: 6 }}>
            <Stack>
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
              <PageEditor label='Nhận xét chi tiết' withAsterisk />
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Paper>
  );
}
