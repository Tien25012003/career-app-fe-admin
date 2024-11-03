export interface ITracking {
  creatorId?: string;
  groupId?: string[];
  createdAt?: Date;
  creator?: string; // email
  updatedAt?: Date;
  updator?: string; // email
}

export interface IImage {
  url: string;
  key: string;
}
