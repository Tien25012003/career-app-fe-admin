export type GroupREQ = {
  groupName: string;
  status: number; // 1: Active , 0: Deactive
  direction?: number; // -1: DESC, 1: ASC
  size: number;
  page: number;
};
