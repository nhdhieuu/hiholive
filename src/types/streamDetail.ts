import { Image } from "@/types/image.ts";

export interface StreamDetailResponse {
  data: StreamDetailResponseData;
}

export interface StreamDetailResponseData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  ChannelId: string;
  channel: Channel;
  title: string;
  notification: string;
  description: string;
  category: Category;
  isRerun: boolean;
  streamKey: string;
  state: string;
  actualStartTime: null;
  actualEndTime: null;
  peakConcurrentView: number;
  totalUniqueViewers: number;
  scheduledStartTime: null;
  status: number;
}

export interface Category {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}

export interface Channel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  image: Image;
  userName: string;
  displayName: string;
}
