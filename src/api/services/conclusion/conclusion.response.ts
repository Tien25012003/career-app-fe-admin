export type ConclusionRESP = {
  _id: string;
  Type: string;
  Holland: 'R' | 'I' | 'A' | 'S' | 'E' | 'C';
  SchoolScore: 'A' | 'B' | 'C' | 'D';
  IQ: string;
  EQ: string;
  Field: string;
  Jobs: string;
  Conclusion: string;
  creator?: string;
  page?: number;
  size?: number;
};
