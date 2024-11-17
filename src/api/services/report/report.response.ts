export type StatisticsRESP = {
  exams: number;
  groups: number;
  teachers?: number;
  students?: number;
};

export type ReportRESP = {
  type?: string;
  score?: number;
  count?: number;
};
