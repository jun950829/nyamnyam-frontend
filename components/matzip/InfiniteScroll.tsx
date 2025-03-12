/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";

export default function useInfiniteScroll(apiUrl: string, pageSize = 2) {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  // 데이터 로드 함수
  const fetchData = async () => {
    if (!hasMore) return;

    try {
      const response = await fetch(`${apiUrl}?page=${page}&size=${pageSize}`);
      const data = await response.json();

      console.log('infinite:', page, data);

      if (data.length === 0) {
        setHasMore(false); // 더 이상 데이터가 없으면 로딩 중단
      } else {
        setPosts((prev) => [...prev, ...data]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      setPosts([]);
      console.error("데이터 로드 오류:", error);
    }
  };

  useEffect(() => {
    fetchData(); // 초기 데이터 로드
  });

  // 마지막 요소 감지하여 추가 데이터 불러오기
  const lastElementRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!lastElementRef.current || !hasMore) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchData();
        }
      },
      { threshold: 1.0 }
    );

    observer.current.observe(lastElementRef.current);
    return () => observer.current?.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastElementRef, hasMore]);

  return { posts, lastElementRef };
}
