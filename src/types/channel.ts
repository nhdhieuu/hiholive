import { Image } from "@/types/image.ts";

export interface Channel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  panel: Image | null;
  image: Image | null;
  userName: string;
  displayName: string;
  description: string;
  contact: string;
  status: number;
}
export interface CreateChannel {
  userName: string;
  displayName: string;
  pannel?: Image | null;
  description?: string;
  contact?: string;
  url?: string; // check url if exist return error
}
