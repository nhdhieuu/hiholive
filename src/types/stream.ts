export interface Stream {
  id: string;
  createdAt: string;
  updatedAt: string;
  ChannelId: string;
  channel: {
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    image?: string;
    userName: string;
    displayName: string;
  };
  title: string;
  description: string;
  category: {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
  };
  isRerun: boolean;
  state: string;
}
