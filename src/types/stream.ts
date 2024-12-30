export interface Stream {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  ChannelId: string;
  channel: Channel;
  title: string;
  description: string;
  category: Category | null;
  currentView: number;
  isRerun: boolean;
  state: string;
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
  image?: string | null;
  userName: string;
  displayName: string;
}
