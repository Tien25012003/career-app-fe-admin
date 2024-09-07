import { EExamStatus } from '@interface/exam';

export const TextExamType = {
  MULTIPLE_CHOICE: 'Multiple choice',
  TICK_BOX: 'Tick box',
  SHORT_ANSWER: 'Câu hỏi ngắn',
};

export const TextExamStatus = {
  ACTIVE: 'Đang hoạt động',
  UNACTIVATED: 'Chưa hoạt động',
  BLOCKED: 'Tạm ngưng',
};

export const ColorExamStatus = (status: EExamStatus) => {
  switch (status) {
    case EExamStatus.ACTIVE:
      return 'teal';
    case EExamStatus.UNACTIVATED:
      return 'gray';
    case EExamStatus.BLOCKED:
      return 'red';
    default:
      return 'gray';
  }
};
