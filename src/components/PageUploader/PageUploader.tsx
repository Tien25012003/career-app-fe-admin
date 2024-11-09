import { FileInput, FileInputProps, Stack } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { IconUpload } from '@tabler/icons-react';
import FilePreview, { FilePreviewProps } from './FilePreview';

interface PageUploaderProps extends FileInputProps {
  previewProps: Omit<FilePreviewProps, 'files'>;
  onClear?: () => void;
  disabled?: boolean;
}
export function PageUploader({ previewProps, onClear, disabled = false, ...props }: PageUploaderProps) {
  const files: FileWithPath[] = Array.isArray(props.value) ? props.value : props.value ? [props.value] : [];

  return (
    <Stack gap={'xs'}>
      <FileInput {...props} leftSection={<IconUpload size='1.25rem' />} disabled={disabled} clearable={!disabled} />
      <FilePreview files={files} {...previewProps} />
    </Stack>
  );
}
