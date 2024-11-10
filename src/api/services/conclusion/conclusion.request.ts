export type ConclusionREQ = {
  Type: string;
  Holland: 'R' | 'I' | 'A' | 'S' | 'E' | 'C';
  SchoolScore: 'A' | 'B' | 'C' | 'D';
  IQ: string;
  EQ: string;
  Field: string;
  Jobs: string;
  Schools: string;
  Conclusion: string;
  creator?: string;
  page?: number;
  size?: number;
};

export type AddConclusionREQ = {
  Type: string;
  Holland: 'R' | 'I' | 'A' | 'S' | 'E' | 'C';
  SchoolScore: 'A' | 'B' | 'C' | 'D';
  IQ: string;
  EQ: string;
  Field: string;
  Jobs: string;
  Schools: string;
  Conclusion: string;
};
