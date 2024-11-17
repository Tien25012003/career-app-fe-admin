import { updateAccountAPI } from '@api/services/account/account.api';
import { TAccountREQ } from '@api/services/account/account.request';
import { onError } from '@helper/error.helpers';
import { Button, Group, Modal, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { NotifyUtils } from '@util/NotificationUtils';
import { SchemaUtils } from '@util/SchemaUtils';
import { userInfoAtom } from 'atoms/auth.store';
import { QUERY_KEYS } from 'constants/query-key.constants';
import useInvalidate from 'hooks/useInvalidate';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().trim().min(1, SchemaUtils.message.nonempty),
  username: z.string().trim().min(1, SchemaUtils.message.nonempty),
});

type UserFormInfoValues = z.infer<typeof formSchema>;

const initialFormValues: UserFormInfoValues = {
  name: '',
  username: '',
};

type EditUserInfoModalProps = {
  open: boolean;
  onClose: () => void;
};
export default function EditUserInfoModal({ open, onClose }: EditUserInfoModalProps) {
  const form = useForm({
    initialValues: initialFormValues,
    validate: zodResolver(formSchema),
  });

  const invalidate = useInvalidate();
  const [userInfo] = useAtom(userInfoAtom);

  // APIS
  const { mutate: editInfoMutation, isPending } = useMutation({
    mutationFn: (request: Partial<TAccountREQ>) => updateAccountAPI(request, userInfo?._id as string),
    onSuccess: () => {
      invalidate({
        queryKey: [QUERY_KEYS.ACCOUNT.USER_INFO],
      });
      NotifyUtils.success('Lưu thay đổi thành công!');
      onClose();
      form.reset();
    },
    onError,
  });

  // METHODS
  const handleSubmit = form.onSubmit((formValues) => {
    editInfoMutation(formValues);
  });

  useEffect(() => {
    if (open) {
      form.setValues({
        username: userInfo?.username,
        name: userInfo?.name,
      });
    }
  }, [open]);

  return (
    <Modal
      opened={open}
      onClose={onClose}
      centered
      size={'md'}
      title='Thay đổi thông tin cá nhân'
      styles={{
        title: {
          fontWeight: 500,
        },
      }}
    >
      <Stack>
        <form onSubmit={handleSubmit}>
          <TextInput withAsterisk label={'Tên tài khoản'} {...form.getInputProps('username')} className='mb-2' />
          <TextInput withAsterisk label={'Tên chủ tài khoản'} {...form.getInputProps('name')} />
        </form>
        <Group justify='flex-end'>
          <Button variant='default' onClick={form.reset}>
            Mặc định
          </Button>
          <Button onClick={() => handleSubmit()} disabled={!form.isDirty()} loading={isPending}>
            Lưu thay dổi
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
