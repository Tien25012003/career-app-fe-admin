import { loginAPI } from '@api/services/auth/auth.api';
import { LoginREQ } from '@api/services/auth/auth.request';
import { LoginRESP } from '@api/services/auth/auth.response';
import { CareerAppLogo } from '@icon/CareerAppLogo';
import { Anchor, Box, Button, Container, getGradient, Group, Paper, PasswordInput, Stack, TextInput, useMantineTheme } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { BaseResponse } from '@type/response.type';
import { NotifyUtils } from '@util/NotificationUtils';
import { SchemaUtils } from '@util/SchemaUtils';
import { accessTokenAtom } from 'atoms/auth.store';
import { AxiosError } from 'axios';
import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const formSchema = z.object({
  username: z.string().trim().min(1, SchemaUtils.message.nonempty),
  password: z.string().trim().min(1, SchemaUtils.message.nonempty),
});

type FormValues = z.infer<typeof formSchema>;
const initialFormValues: FormValues = {
  username: '',
  password: '',
};

export default function LoginPage() {
  //const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const setAccessToken = useSetAtom(accessTokenAtom);

  // FORM
  const form = useForm({
    initialValues: initialFormValues,
    validate: zodResolver(formSchema),
  });

  // API
  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: (request: LoginREQ) => loginAPI(request),
    onSuccess: ({ data }: BaseResponse<LoginRESP>) => {
      NotifyUtils.success('Đăng nhập thành công!');
      setAccessToken(data.accessToken);
      navigate('/');
    },
    onError: (error: AxiosError) => {
      console.log('error', error);
      NotifyUtils.error('Đăng nhập thất bại!');
    },
  });

  // METHODS
  const handleFormSubmit = form.onSubmit((formValues) => {
    loginMutation({ username: formValues.username, password: formValues.password });
  });
  return (
    <Box
      //bg={colorScheme === "dark" ? theme.colors.dark[6] : theme.colors?.gray[1]}
      bg={getGradient(
        {
          deg: 180,
          from: theme.colors.green[9],
          to: theme.colors.green[1],
        },
        theme,
      )}
      mih='100vh'
    >
      <Container size={420} pt='20vh' pb='2rem'>
        <Paper withBorder shadow='md' radius={'md'} p={30}>
          <Stack justify='center' align='center'>
            <CareerAppLogo />
          </Stack>
          <form onSubmit={handleFormSubmit}>
            <TextInput withAsterisk label='Tên đăng nhập' {...form.getInputProps('username')} />
            <PasswordInput withAsterisk label='Mật khẩu' mt='md' {...form.getInputProps('password')} />
            <Group justify='end' mt='sm'>
              <Anchor component='button' size='sm' c={theme.colors.blue[6]}>
                Quên mật khẩu?
              </Anchor>
            </Group>
            <Button type='submit' fullWidth mt='xl' loading={isPending}>
              Đăng nhập
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
