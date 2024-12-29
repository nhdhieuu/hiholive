/*export interface Stream {
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
}*/
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
  image: string;
  userName: string;
  displayName: string;
}
