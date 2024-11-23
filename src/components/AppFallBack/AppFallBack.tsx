import { Box, Loader } from '@mantine/core';

type AppFallBackProps = {
  variant?: 'loading' | 'not-allow';
};
export default function AppFallBack({ variant = 'loading' }: AppFallBackProps) {
  if (variant === 'loading')
    return (
      <Box className='absolute left-0 right-0 top-0 bottom-0 bg-white opacity-70 rounded-md items-center justify-center flex'>
        <Loader />
      </Box>
    );
  if (variant === 'not-allow') {
    return (
      <Box
        className='absolute left-0 right-0 top-0 bottom-0 bg-white opacity-70 rounded-md items-center justify-center flex'
        style={{ cursor: 'not-allowed' }}
      />
    );
  }
  return null;
}
