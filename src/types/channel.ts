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
  contact: string;
  status: number;
}
