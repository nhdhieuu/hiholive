import { Image } from "@/types/image.ts";

export interface Category {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  image: Image;
  status: number;
  totalContent: number;
}
export interface CreateCategory {
  name: string;
  description: string;
  image?: Image;
}
