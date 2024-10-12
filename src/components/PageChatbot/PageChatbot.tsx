import {
  ActionIcon,
  Affix,
  Avatar,
  Box,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
  CloseButton,
  useMantineColorScheme,
  alpha,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBrandHipchat, IconSend2 } from '@tabler/icons-react';
import CloverLogo from '@asset/clover.png';
import { IChat } from '@interface/chatbot';
import { twMerge } from 'tailwind-merge';

const CHATBOT_SAMPLE: IChat[] = [
  {
    isBot: false,
    message: 'Who are you?',
  },
  {
    isBot: true,
    message: 'I am Career App',
  },
  {
    isBot: false,
    message: 'Who are you?',
  },
  {
    isBot: true,
    message: 'I am Career App',
  },
  {
    isBot: false,
    message: 'Who are you?',
  },
  {
    isBot: true,
    message: 'I am Career App',
  },
  {
    isBot: false,
    message: 'Who are you?',
  },
  {
    isBot: true,
    message: 'I am Career App',
  },
];

export default function PageChatbot() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

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
                <Stack h={400} className='overflow-y-auto static-scrollbar' px='md' py='xs'>
                  {CHATBOT_SAMPLE?.map((chat, index) => {
                    return (
                      <Group
                        key={index}
                        align='end'
                        justify={chat.isBot ? 'start' : 'end'}
                        className={twMerge('w-full', !chat.isBot && 'flex-row-reverse')}
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
                          {chat.message}
                        </Box>
                      </Group>
                    );
                  })}
                </Stack>
                <Stack px='md' pb='sm'>
                  <Group justify='space-between' align='center' wrap='nowrap'>
                    <TextInput className='w-full' radius={'md'} placeholder='Nhập câu hỏi...' />
                    <ActionIcon variant='subtle' radius={'lg'} size={'lg'}>
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
