'use client';

import PostForm from "@/components/commons/forms/PostForm";
import { useRouter } from "next/navigation";

export default function MatZipWrite() {
  const router = useRouter();

  return (
    <div className="w-9/10 mt-10 mb-30">
      <PostForm topic="matzip" onSuccess={() => {
        alert('등록 완료!')
        router.push('matzip');
      }}/>
    </div>
  )
}
