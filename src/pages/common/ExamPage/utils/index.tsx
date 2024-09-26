import { EExamStatus, EQuestionType } from '@enum/exam';

export const TextQuestionType = {
  MULTIPLE_CHOICE: 'Multiple choice',
  TICK_BOX: 'Tick box',
  SHORT_ANSWER: 'Câu hỏi ngắn',
  COMBINE: 'Hỗn hợp',
};

export const TextExamStatus = {
  ACTIVE: 'Đang hoạt động',
  UNACTIVATED: 'Chưa hoạt động',
  BLOCKED: 'Tạm ngưng',
};

export const TextExamCategory = {
  SYSTEM: 'Hệ thống',
  DESIGN: 'Tự thiết kế',
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

export const ColorQuestionType = (type: EQuestionType) => {
  switch (type) {
    case EQuestionType.MULTIPLE_CHOICE:
      return 'blue';
    case EQuestionType.TICK_BOX:
      return 'pink';
    case EQuestionType.SHORT_ANSWER:
      return 'orange';
    default:
      return 'gray';
  }
};
