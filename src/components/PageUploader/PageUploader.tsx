import { FileInput, FileInputProps, Stack } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import FilePreview, { FileAndPath } from './FilePreview';

type TPageUploader = FileInputProps & {
  previewProps: {
    image: boolean;
    isLoading: boolean;
  };
  onClear?: () => void;
};
export function PageUploader({ previewProps, onClear, ...props }: TPageUploader) {
  const files: FileAndPath[] = Array.isArray(props.value) ? props.value : props.value ? [props.value] : [];

  return (
    <Stack gap={'xs'}>
      <FileInput {...props} leftSection={<IconUpload size='1.25rem' />} clearable />
      <FilePreview image={previewProps.image} files={files} isLoading={previewProps.isLoading} />
    </Stack>
  );
}
