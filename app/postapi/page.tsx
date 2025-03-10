"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "@/libs/apis/api";
import { useState } from "react";

export default function AddUser() {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const mutation = useMutation({
    mutationFn: createUser, // ✅ API 호출 함수
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] }); // ✅ 캐시된 데이터 갱신
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ name, email }); // ✅ API 호출 실행
  };

  return (
    <div>
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Adding..." : "Add User"}
        </button>
      </form>
      {mutation.isError && <p>Error adding user</p>}
    </div>
  );
}
