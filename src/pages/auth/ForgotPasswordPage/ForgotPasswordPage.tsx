import { forgotPasswordAPI } from '@api/services/auth/auth.api';
import { ForgotPasswordREQ } from '@api/services/auth/auth.request';
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
  newPassword: z.string().trim().min(1, SchemaUtils.message.nonempty),
});

type FormValues = z.infer<typeof formSchema>;
const initialFormValues: FormValues = {
  username: '',
  newPassword: '',
};

export default function LoginPage() {
  //const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const navigate = useNavigate();

  // FORM
  const form = useForm({
    initialValues: initialFormValues,
    validate: zodResolver(formSchema),
  });

  // API
  const { mutate: forgotPasswordMutation, isPending } = useMutation({
    mutationFn: (request: ForgotPasswordREQ) => forgotPasswordAPI(request),
    onSuccess: ({ data }: BaseResponse<void>) => {
      NotifyUtils.success('Vui lòng kiểm tra email của bạn để xác thực đổi mật khẩu');
      navigate('/login');
    },
    onError: (error: AxiosError) => {
      NotifyUtils.error('Không tìm thấy thông tin đăng nhập. Vui lòng kiểm tra lại!');
    },
  });

  // METHODS
  const handleFormSubmit = form.onSubmit((formValues) => {
    forgotPasswordMutation({ username: formValues.username, newPassword: formValues.newPassword });
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
            <PasswordInput withAsterisk label='Mật khẩu mới' mt='md' {...form.getInputProps('newPassword')} />

            <Button type='submit' fullWidth mt='xl' loading={isPending}>
              Xác nhận
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
