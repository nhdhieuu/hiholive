export interface Channel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  panel: string | null;
  image: string | null;
  userName: string;
  displayName: string;
  description: string;
  url: string;
  contact: string;
  status: number;
}
