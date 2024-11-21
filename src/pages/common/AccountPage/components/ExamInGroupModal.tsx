import { queryClient } from '@api/config/queryClient';
import { addExamInGroup, getExamSelectAPI } from '@api/services/exam/exam.api';
import { TExamToGroupREQ } from '@api/services/exam/exam.request';
import { getGroupSelectAPI } from '@api/services/group/group.api';
import { Button, Divider, Group, Modal, Select, Stack, Text } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { NotifyUtils } from '@util/NotificationUtils';
import { SchemaUtils } from '@util/SchemaUtils';
import { AxiosError } from 'axios';
import { QUERY_KEYS } from 'constants/query-key.constants';
import { useMemo } from 'react';
import { z } from 'zod';

type TExamInGroupProps = {
  groupId: string;
  opened: boolean;
  onClose: () => void;
};
type FormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  groupId: z.string().min(1, SchemaUtils.message.nonempty),
  examId: z.string().min(1, SchemaUtils.message.nonempty),
});
const ExamInGroupModal = ({ opened, onClose, groupId }: TExamInGroupProps) => {
  const { data: groupSelect } = useQuery({
    queryKey: [QUERY_KEYS.GROUP.SELECT],
    queryFn: () => getGroupSelectAPI(),
  });
  const { data: examSelect } = useQuery({
    queryKey: [QUERY_KEYS.EXAM.SELECT],
    queryFn: () => getExamSelectAPI(),
  });
  const initialFormValues: FormValues = useMemo(
    () => ({
      groupId: groupId,
      examId: '',
    }),
    [groupId],
  );
  const { mutate: addExamToGroup, isPending } = useMutation({
    mutationFn: (value: TExamToGroupREQ) => addExamInGroup(value),
    onSuccess: () => {
      NotifyUtils.success('Thêm bài kiểm tra thành công!');
      form.reset();
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.EXAM.LIST],
      });
      onClose();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      NotifyUtils.error(error.response?.data?.message);
    },
  });
  const form = useForm({
    initialValues: initialFormValues,
    validate: zodResolver(formSchema),
  });
  const onAddExamToGroup = form.onSubmit((values) => {
    addExamToGroup(values);
  });

  const handleClose = () => {
    onClose();
    form.reset();
  };

  return (
    <Modal opened={opened} onClose={handleClose} title={<Text fw={'bold'}>Nhập thông tin</Text>}>
      <Stack>
        <Select
          disabled
          label='Chọn nhóm'
          placeholder='Chọn nhóm'
          data={groupSelect?.data?.map((group) => ({ label: group.groupName, value: group._id }))}
          {...form.getInputProps('groupId')}
        />
        <Select
          label='Chọn bài kiểm tra'
          placeholder='Chọn bài kiểm tra'
          data={examSelect?.data?.map((exam) => ({ label: `${exam.name}  - ${exam.category}`, value: exam._id }))}
          {...form.getInputProps('examId')}
        />
        <Divider />
        <Group justify='flex-end'>
          <Button variant='default' onClick={handleClose}>
            Hủy
          </Button>
          <Button onClick={() => onAddExamToGroup()} loading={isPending} disabled={!form.isDirty()}>
            Xác nhận
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default ExamInGroupModal;
