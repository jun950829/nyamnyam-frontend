import { userTypes } from "@/constants/types";
import { create } from "zustand";

type UserStore = {
  user: userTypes | null;
  isAdmin: boolean,
  logout: () => void;
  setUser: (user: userTypes) => void;
  setAdmin: () => void;
};


const useLoginStore = create<UserStore>((set) => ({
  user: null, // 로그인한 사용자 정보 (초기값: null)
  isAdmin: false, // 로그인 여부
  logout: () => set({ user: null, isAdmin: false }),
  setUser: (state: userTypes) => set({user: state}),
  setAdmin: () => set({isAdmin: true })
}));

export default useLoginStore;
