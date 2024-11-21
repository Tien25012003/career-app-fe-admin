export type DoExamRESP = {
  _id: string;
  examId: string;
  groupId: string;
  examName: string;
  totalScore: number;
  creator?: string;
  createdAt?: string;
};
