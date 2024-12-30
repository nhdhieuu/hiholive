import { Image } from "@/types/image.ts";

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  phone_number: string;
  address: string;
  first_name: string;
  last_name: string;
  user_name: string;
  display_name: string;
  date_of_birth: string;
  gender: string;
  SystemRole: string;
  avatar: string | null;
  bio: string;
  status: number;
}

export interface UserUpdate {
  phone_number?: string;
  address?: string;
  first_name?: string;
  last_name?: string;
  gender?: string;
  date_of_birth?: string;
  avatar?: Image | null;
}
export interface UserNameAndDisplayName {
  user_name: string;
  display_name: string;
}
