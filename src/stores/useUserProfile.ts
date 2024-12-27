// src/stores/useUserProfile.ts
import { create } from "zustand";
import { UserProfile } from "@/types/userProfile.ts";

interface UserProfileState {
  userProfile: UserProfile | null;
  // eslint-disable-next-line no-unused-vars
  setUserProfile: (profile: UserProfile) => void;
  clearUserProfile: () => void;
}

export const useUserProfile = create<UserProfileState>((set) => ({
  userProfile: null,
  setUserProfile: (profile: UserProfile) => set({ userProfile: profile }),
  clearUserProfile: () => set({ userProfile: null }),
}));
