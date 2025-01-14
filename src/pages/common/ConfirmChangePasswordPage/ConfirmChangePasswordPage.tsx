import { Center, Image, Paper, Stack, Text } from '@mantine/core';
import SuccessGif from '@asset/success.gif';
import FailGif from '@asset/fail.gif';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
export default function ConfirmChangePasswordPage() {
  // const actionLink = `https://career-app-ndt9.onrender.com/accounts/confirmChangePassword?id=${id}&token=${newPassword}`;
  const [searchParams] = useSearchParams();
  const [isSucess, setIsSuccess] = useState(false);
  useEffect(() => {
    const id = searchParams.get('id');
    const token = searchParams.get('token');

    if (id && token) {
      // Call the API to confirm the change password action
      axios
        .get(`https://career-app-ndt9.onrender.com/accounts/confirmChangePassword?id=${id}&token=${token}`)
        .then((response) => {
          setIsSuccess(true);
        })
        .catch((error) => {
          setIsSuccess(false);
        });
    } else {
      setIsSuccess(false);
    }
  }, [searchParams]);
  return (
    <Stack h={'100dvh'} w={'100dvw'} justify='center' align='center'>
      {isSucess ? (
        <Paper shadow='sm' p={'lg'}>
          <Center>
            <Image src={SuccessGif} w={300} />
          </Center>
          <Text ta={'center'} fz={'h3'} fw={'bold'}>
            Đổi mật khẩu thành công!
          </Text>
          <Text w={300} ta={'center'}>
            "Bạn đã đổi mật khẩu thành công. Hãy sử dụng mật khẩu mới để đăng nhập và đảm bảo thông tin tài khoản của bạn luôn được bảo mật."
          </Text>
        </Paper>
      ) : (
        <Paper shadow='sm' p={'lg'}>
          <Center>
            <Image src={FailGif} w={200} />
          </Center>
          <Text ta={'center'} fz={'h3'} fw={'bold'}>
            Đổi mật khẩu thất bại!
          </Text>
          <Text w={300} ta={'center'}>
            "Bạn đã đổi mật khẩu thất bại. Vui lòng kiểm tra thông tin đăng nhập!"
          </Text>
        </Paper>
      )}
    </Stack>
  );
}
