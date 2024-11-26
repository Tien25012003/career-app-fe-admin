import { IExam } from '@interface/exam';
import { ExamDetailRESP } from './exam.response';

export const examDtoService = (exam: ExamDetailRESP): IExam | null =>
  !exam
    ? null
    : {
        ...exam,
        questions: exam?.questions?.map((q) => ({ ...q, id: q._id, options: q.options?.map((o) => ({ ...o, id: o._id })) })),
        results: exam?.results?.map((r) => ({ ...r, id: r._id })),
      };
