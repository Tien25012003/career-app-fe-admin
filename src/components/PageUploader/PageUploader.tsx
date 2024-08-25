import { FileInput, FileInputProps, Stack } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';

type TPageUploader = FileInputProps & {
  previewProps: {
    image: boolean;
    isLoading: boolean;
  };
};
export function PageUploader({ previewProps, ...props }: TPageUploader) {
  return (
    <Stack gap={'xs'}>
      <FileInput {...props} leftSection={<IconUpload size='1.25rem' />} />
    </Stack>
  );
}
