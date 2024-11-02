import FilePreview from '@component/PageUploader/FilePreview';
import { EFileType } from '@enum/file.enum';
import { CloseButton, Group, Stack, Text, rem } from '@mantine/core';
import { Dropzone, DropzoneProps, FileWithPath } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';

interface PageDropZoneProps extends DropzoneProps {
  maxSize?: number;
  acceptType?: EFileType[];
  previewProps: {
    files: FileWithPath | FileWithPath[] | null;
    isLoading: boolean;
  };
  onClear?: () => void;
  label?: string;
  withAsterisk?: boolean;
  placeHolder?: string;
}
export default function PageDropZone({
  maxSize,
  acceptType,
  previewProps,
  onClear,
  withAsterisk = false,
  label,
  placeHolder = 'Kéo / thả hoặc chọn file',
  ...props
}: PageDropZoneProps) {
  const files: FileWithPath[] = Array.isArray(previewProps.files) ? previewProps.files : previewProps.files ? [previewProps.files] : [];
  return (
    <Stack gap={0}>
      <p className='m_8fdc1311 mantine-InputWrapper-label my-[1px]'>
        {label}
        {withAsterisk && <span className='ml-1 text-red-400'>*</span>}
      </p>
      <Stack className='relative'>
        <Dropzone
          //onDrop={(files) => console.log('accepted files', files)}
          //onReject={(files) => console.log('rejected files', files)}
          maxSize={maxSize}
          accept={acceptType}
          loading={previewProps.isLoading}
          {...props}
        >
          <Group justify='center' gap='xl' mih={220} style={{ pointerEvents: 'none' }}>
            {files?.length === 0 ? (
              <>
                <Dropzone.Accept>
                  <IconUpload style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }} stroke={1.5} />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }} stroke={1.5} />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }} stroke={1.5} />
                </Dropzone.Idle>

                <div>
                  <Text size='xl' inline>
                    {placeHolder}
                  </Text>
                  {!!maxSize && (
                    <Text size='sm' c='dimmed' inline mt={7}>
                      Vui lòng chọn file không vượt quá {maxSize}
                    </Text>
                  )}
                </div>
              </>
            ) : (
              <FilePreview image={true} files={files} isLoading={previewProps.isLoading} />
            )}
          </Group>
        </Dropzone>
        {files?.length !== 0 && <CloseButton className='absolute right-2 top-2' onClick={() => onClear?.()} />}
      </Stack>
    </Stack>
  );
}
