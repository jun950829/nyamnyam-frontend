'use client';

import Btn from "@/components/commons/buttons/Btn";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export const RecipeContent = () => {
  const params = useParams();
  const { id } = params;
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    if(!true) {
      getLikes();
    }
  }, [])

  const getLikes = async () => {
    const response = await fetch("http://localhost:8080/api/like/1");
    const data = await response.json();

    console.log(data);
    setLikes(data);
  }

  const addLikes = async () => {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 1,
        postId: id,
      }),
    });
  
    const data = await response.json();
    console.log("서버 응답:", data);
  }

  return (
    <>
      {likes}
      <Btn label="좋아요" onClick={addLikes} />



    </>
  )
}

export default RecipeContent