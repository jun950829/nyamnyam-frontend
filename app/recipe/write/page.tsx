'use client';

import PostForm from "@/components/commons/forms/PostForm";
import { useRouter } from "next/navigation";

export const RecipeWrite = () => {
  const router = useRouter();

  return (
    <div className="w-9/10 mt-10 mb-30">
      <PostForm topic="recipe" onSuccess={() => {
        alert('등록 완료!')
        router.push('recipe');
      }}/>
    </div>
  )


}

export default RecipeWrite;