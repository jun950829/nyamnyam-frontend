// src/types/global.d.ts
export {}; // TypeScript 모듈 시스템을 따르게 함

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any; // Kakao 객체를 any 타입으로 선언
  }
}
