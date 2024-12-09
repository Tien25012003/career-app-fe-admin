import { executePromptAPI } from '@api/services/chat-bot/chat-bot.api';
import CloverLogo from '@asset/clover.png';
import { onError } from '@helper/error.helpers';
import {
  ActionIcon,
  Affix,
  alpha,
  Avatar,
  Box,
  CloseButton,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  TextInput,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBrandHipchat, IconSend2 } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type TPrompt = {
  isBot: boolean;
  message: string;
};

export default function PageChatbot() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  // STATES
  const [prompts, setPrompts] = useState<TPrompt[] | []>([]);
  const [value, setValue] = useState('');

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // APIS
  const { mutate: executePromptMutation, isPending } = useMutation({
    mutationFn: (prompt: string) => executePromptAPI({ prompt }),
    onSuccess: ({ data }) => {
      if (typeof data === 'string') {
        setPrompts([...prompts, { isBot: true, message: data }]);
        setValue('');
      }
    },
    onError,
  });

  // METHODS
  const onExecutePrompt = () => {
    if (value) {
      setPrompts([...prompts, { isBot: false, message: value }]);
      executePromptMutation(value);
    }
  };

  // EFFECTS
  // Scroll to the bottom whenever the prompts change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [prompts]);

  return (
    <>
      <Affix position={{ bottom: 130, right: 10 }} zIndex={99}>
        <ActionIcon variant='filled' radius={50} w={50} h={50} className='shadow-lg' onClick={toggle}>
          <IconBrandHipchat size={20} />
        </ActionIcon>
      </Affix>
      <Affix position={{ bottom: 80, right: 15 }} zIndex={100} className='w-full md:w-[400px]'>
        {opened && (
          <Paper shadow='md' ml={25} className='overflow-hidden' radius={'lg'} withBorder>
            <Stack bg={colorScheme === 'dark' ? alpha(theme.colors.dark[7], 0.8) : theme.white} gap={0}>
              <Box className='shadow-md drop-shadow-2xl' bg='teal'>
                <Group justify='space-between' align='center' p='xs'>
                  <Group gap={'sm'} align='center'>
                    <Avatar
                      src={CloverLogo}
                      style={{
                        border: '1px solid #d0d1d6',
                      }}
                      p='xs'
                      size='lg'
                      bg='white'
                    />
                    <Text fw={600} c='white'>
                      Chat với Career App
                    </Text>
                  </Group>
                  <CloseButton
                    c='white'
                    onClick={() => {
                      close();
                    }}
                  />
                </Group>
              </Box>

              <Stack>
                <Stack h={400} className='overflow-y-auto static-scrollbar' px='md' py='xs' ref={chatContainerRef}>
                  {prompts?.length === 0 ? (
                    <Stack align='center' justify='center' mt='xl'>
                      <Box className='opacity-40'>
                        <Image src={CloverLogo} h={80} w={80} />
                      </Box>
                      <Text c={'gray'}>Chúc bạn một ngày tốt lành!</Text>
                    </Stack>
                  ) : (
                    <>
                      {prompts?.map((chat, index) => {
                        return (
                          <Group
                            key={index}
                            align='end'
                            justify={chat.isBot ? 'start' : 'end'}
                            className={twMerge('w-full flex-nowrap', !chat.isBot && 'flex-row-reverse')}
                          >
                            <Avatar src={chat?.isBot ? CloverLogo : null} p={1} size={'sm'} />
                            <Box
                              style={{
                                //border: '1px solid #d0d1d6',
                                borderRadius: 10,
                              }}
                              p='sm'
                              bg={colorScheme === 'dark' ? theme.colors.dark[5] : '#f2edf8'}
                            >
                              <Text size='sm'>{chat.message}</Text>
                            </Box>
                          </Group>
                        );
                      })}
                    </>
                  )}
                </Stack>
                <Stack px='md' pb='sm'>
                  <Group justify='space-between' align='center' wrap='nowrap'>
                    <TextInput
                      className='w-full'
                      radius={'md'}
                      placeholder='Nhập câu hỏi...'
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      disabled={isPending}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          onExecutePrompt();
                        }
                      }}
                    />
                    <ActionIcon variant='subtle' radius={'lg'} size={'lg'} onClick={onExecutePrompt} loading={isPending}>
                      <IconSend2 />
                    </ActionIcon>
                  </Group>
                </Stack>
              </Stack>
            </Stack>
          </Paper>
        )}
      </Affix>
    </>
  );
}
