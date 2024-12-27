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
  userProfile: JSON.parse(localStorage.getItem("userProfile") || "null"),
  setUserProfile: (profile: UserProfile) => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    set({ userProfile: profile });
  },
  clearUserProfile: () => {
    localStorage.removeItem("userProfile");
    set({ userProfile: null });
  },
}));
