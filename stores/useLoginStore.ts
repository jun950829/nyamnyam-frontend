import { userTypes } from "@/constants/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UserStore = {
  user: userTypes | null;
  isAdmin: boolean;
  isHydrated: boolean; // ✅ Zustand의 persist 데이터가 로드되었는지 확인하는 변수
  logout: () => void;
  setUser: (user: userTypes) => void;
  setAdmin: () => void;
  setHydrated: (hydrated: boolean) => void; // ✅ 상태 로드 완료 여부를 설정하는 함수
};

const useLoginStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null, // 로그인한 사용자 정보 (초기값: null)
      isAdmin: false, // 로그인 여부
      isHydrated: false, // ✅ persist 데이터 로드 여부 (초기값: false)
      logout: () => set({ user: null, isAdmin: false, isHydrated: true }),
      setUser: (user: userTypes) => set({ user, isHydrated: true }),
      setAdmin: () => set({ isAdmin: true }),
      setHydrated: (hydrated) => set({ isHydrated: hydrated }), // ✅ persist 데이터 로드 여부 변경
    }),
    {
      name: "login-storage", // localStorage에 저장될 키
      storage: createJSONStorage(() => localStorage), // ✅ 안전한 localStorage 설정
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true); // ✅ Zustand persist 데이터가 로드되면 isHydrated 상태를 true로 변경
      },
    }
  )
);

export default useLoginStore;
