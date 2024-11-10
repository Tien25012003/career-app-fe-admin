import { Card, Flex, Group, Image, Loader, Stack, Text, Transition, useMantineTheme } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { IconFileText, IconPhoto } from '@tabler/icons-react';
import { TextUtils } from '@util/TextUtils';
import { useEffect, useState } from 'react';

// export type FileAndPath = File & { path?: string };
export type FilePreviewProps = {
  image: boolean;
  files: FileWithPath[];
  isLoading?: boolean;
  height?: number;
};
export default function FilePreview({ image, files, height = 300, isLoading = false }: FilePreviewProps) {
  const theme = useMantineTheme();

  const [cachedFiles, setCachedFiles] = useState(files);

  const FileIcon = image ? IconPhoto : IconFileText;

  useEffect(() => {
    if (files.length > 0) {
      setCachedFiles(files);
    }
  }, [files]);

  return (
    <Transition mounted={files?.length > 0} transition={'pop'} duration={400} timingFunction='ease'>
      {(styles) => (
        <Stack style={styles}>
          {cachedFiles?.map((file, index) => {
            const imageUrl = URL.createObjectURL(file);
            return (
              <Card key={index} padding={'xs'} withBorder>
                {image && (
                  <Card.Section>
                    <Image src={imageUrl} h={height} fit='contain' alt={file.name} onLoad={() => !file.path && URL.revokeObjectURL(imageUrl!)} />
                  </Card.Section>
                )}
                <Group gap={'xs'} wrap='nowrap'>
                  {isLoading ? (
                    <Flex justify='center' align='center' miw='3rem' mih='3rem'>
                      <Loader />
                    </Flex>
                  ) : (
                    <FileIcon size={'3rem'} stroke={1} color={theme.colors.gray[5]} style={{ minWidth: '3rem' }} />
                  )}

                  <Stack gap={0} style={{ overflow: 'hidden' }}>
                    <Text
                      title={file.name}
                      ff={theme.other.altMonospace}
                      size='sm'
                      style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      {file.name}
                    </Text>
                    <Text size='sm' color='dimmed'>
                      {TextUtils.prettyBytes(file.size)}
                    </Text>
                  </Stack>
                </Group>
              </Card>
            );
          })}
        </Stack>
      )}
    </Transition>
  );
}
