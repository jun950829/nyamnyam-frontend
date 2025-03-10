"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/libs/apis/api";

export const GetApi = () => {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"], // ✅ 캐싱을 위한 키
    queryFn: fetchUsers, // ✅ API 호출 함수
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((user: { id: number; name: string }) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default GetApi;