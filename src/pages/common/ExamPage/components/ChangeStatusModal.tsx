import { updateStatusAPI } from '@api/services/exam/exam.api';
import { ExamRESP } from '@api/services/exam/exam.response';
import { EExamStatus } from '@enum/exam';
import { onError } from '@helper/error.helpers';
import { Button, ComboboxItem, Group, Modal, Select, Stack } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { NotifyUtils } from '@util/NotificationUtils';
import { QUERY_KEYS } from 'constants/query-key.constants';
import useInvalidate from 'hooks/useInvalidate';
import { useEffect, useMemo } from 'react';
import { z } from 'zod';
import { TextExamStatus } from '../utils';

const formSchema = z.object({
  status: z.nativeEnum(EExamStatus),
});

type StatusFormValues = z.infer<typeof formSchema>;
const initialFormValues: StatusFormValues = {
  status: EExamStatus.UNACTIVATED,
};

type ChangeStatusModalProps = {
  open?: boolean;
  onCancel: () => void;
  initialValues?: ExamRESP;
};
export default function ChangeStatusModal({ open = false, onCancel, initialValues }: ChangeStatusModalProps) {
  const form = useForm({
    initialValues: initialFormValues,
    validate: zodResolver(formSchema),
  });

  const items = useMemo<ComboboxItem[]>(
    () =>
      Object.values(EExamStatus)
        .filter((item) => item !== EExamStatus.BLOCKED)
        .map((key) => ({
          value: key,
          label: TextExamStatus[key],
        })),
    [],
  );

  // APIS

  const invalidate = useInvalidate();

  const { mutate: updateStatusMutation, isPending: isUpdatingStatus } = useMutation({
    mutationFn: (status: EExamStatus) => updateStatusAPI(initialValues?._id as string, status),
    onSuccess: () => {
      invalidate({
        queryKey: [QUERY_KEYS.EXAM.DESIGN_LIST],
      });
      onCancel();
      NotifyUtils.success('Chuyển trạng thái thành công!');
    },
    onError,
  });

  // METHODS
  const handleSubmit = form.onSubmit((formValues) => {
    if (formValues.status !== initialValues?.status) {
      updateStatusMutation(formValues.status);
    }
  });

  useEffect(() => {
    if (initialValues) {
      form.setFieldValue('status', initialValues.status as EExamStatus);
    }
  }, [initialValues]);

  return (
    <Modal
      opened={open}
      onClose={onCancel}
      centered
      size={'sm'}
      title='Chuyển trạng thái của bài kiểm tra'
      styles={{
        title: {
          fontWeight: 500,
        },
      }}
    >
      <Stack>
        <Select withAsterisk label='Trạng thái' placeholder='' data={items} {...form.getInputProps('status')} />
        {/* <Text size='sm' fw={500}>
          Lưu ý: Khi chuyển trạng thái từ "Chưa hoạt động" sang "Hoạt động", bài kiểm tra sẽ được xuất hiện ở mobile
        </Text> */}
        <Group justify='flex-end'>
          <Button onClick={() => handleSubmit()} loading={isUpdatingStatus}>
            Lưu
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
