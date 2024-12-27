export interface UserProfile {
  id: string;
  createdAt: string;
  updatedAt: string;
  phone_number: string;
  address: string;
  first_name: string;
  last_name: string;
  display_name: string;
  date_of_birth: string;
  gender: string;
  SystemRole: string;
  avatar: string | null;
  bio: string;
  status: number;
}
