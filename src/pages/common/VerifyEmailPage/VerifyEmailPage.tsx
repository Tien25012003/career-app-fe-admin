import { Center, Image, Paper, Stack, Text } from '@mantine/core';
import SuccessGif from '@asset/success.gif';
import FailGif from '@asset/fail.gif';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
export default function VerifyEmailPage() {
  // const actionLink = `https://career-app-ndt9.onrender.com/accounts/confirmChangePassword?id=${id}&token=${newPassword}`;
  const [searchParams] = useSearchParams();
  const [isSucess, setIsSuccess] = useState(false);
  useEffect(() => {
    const id = searchParams.get('id');

    if (id) {
      // Call the API to confirm the change password action
      axios
        .get(`https://career-app-ndt9.onrender.com/accounts/verify?id=${id}`)
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
            Tài khoản Email của đã được xác thực
          </Text>
          <Text w={300} ta={'center'}>
            Tài khoản của bạn đã được xác thực. Vui lòng tiếp tục quá trình đăng nhập!
          </Text>
        </Paper>
      ) : (
        <Paper shadow='sm' p={'lg'}>
          <Center>
            <Image src={FailGif} w={200} />
          </Center>
          <Text ta={'center'} fz={'h3'} fw={'bold'}>
            Tài khoản Email của chưa được xác thực
          </Text>
          <Text w={300} ta={'center'}>
            Tài khoản của bạn chưa được xác thực. Vui lòng kiểm tra lại thông tin đăng ký!
          </Text>
        </Paper>
      )}
    </Stack>
  );
}
