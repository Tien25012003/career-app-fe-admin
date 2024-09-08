import { EQuestionType } from '@interface/exam';
import { Button, Group, Modal, Radio, Stack } from '@mantine/core';
import { TextQuestionType } from '../utils';
import { useState } from 'react';
type Props = {
  opened: boolean;
  onCancel: () => void;
  onFinish: (value: EQuestionType) => void;
  questionTypeList?: EQuestionType[];
};
export function QuestionTypeModal({ opened, onCancel, onFinish, questionTypeList }: Props) {
  const [questionType, setQuestionType] = useState<EQuestionType>(EQuestionType.MULTIPLE_CHOICE);
  const questionTypes = questionTypeList ? questionTypeList : Object.keys(EQuestionType);
  return (
    <Modal
      opened={opened}
      onClose={onCancel}
      centered
      size={'md'}
      title='Vui lòng chọn loại kiểm tra'
      styles={{
        title: {
          fontWeight: 500,
        },
      }}
    >
      <Stack>
        <Radio.Group withAsterisk label='Thể loại' value={questionType} onChange={(value) => setQuestionType(value as EQuestionType)}>
          <Group mt='xs'>
            {questionTypes?.map((item, index) => <Radio value={item} label={TextQuestionType[item as EQuestionType]} key={index} />)}
          </Group>
        </Radio.Group>
        <Group justify='flex-end'>
          <Button variant='default' onClick={onCancel}>
            Huỷ
          </Button>
          <Button
            onClick={() => {
              onFinish(questionType);
              onCancel();
            }}
          >
            Thêm
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
