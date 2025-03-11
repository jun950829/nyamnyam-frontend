import "react-kakao-maps-sdk";

// 장소 검색 객체 생성

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const searchKaKaoPlace = (keyword: string, changeState: Function) => {
  const ps = new window.kakao.maps.services.Places();
// 검색 실행 함수
  ps.keywordSearch(keyword, (data: unknown, status: unknown) => {
  if (status === window.kakao.maps.services.Status.OK) {
      console.log("검색 결과:", data);
      changeState(data);

  } else {
      console.error("검색 결과 없음");
  }
  });
}
