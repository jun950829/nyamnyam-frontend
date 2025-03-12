'use client';

import Btn from "@/components/commons/buttons/Btn";
import useLoginStore from "@/stores/useLoginStore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

type PostType = {
  title: string;
  nickname:string;
  shop_name: string;
  address: string;
  content: string;
  media_data: string;
} | null;

export default function MatzipContent() {
  const params = useParams();
  const { id } = params;
  const [likes, setLikes] = useState(0);
  const [post, setPost] = useState<PostType>(null);
  const user = useLoginStore((state) => state.user);

  useEffect(() => {
    getPostData();
    if(!true) {
      getLikes();
    }
  }, [])

  const getPostData = async() => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/id/${id}`);
    const data = await response.json();

    console.log(data);
    setPost(data);
    setLikes(data.likes);
  }

  const getLikes = async () => {
    const response = await fetch("https://nyamnyam.laterre.dev/api/like/1");
    const data = await response.json();

    console.log(data);
    setLikes(data);
  }

  const addLikes = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user ? user.id : "",
        postId: id,
      }),
    });
  
    const result = await response.json();
    
    console.log("서버 응답:", result);
    if(result.result_code === "202") {
      alert(result.result_message)
    } else {
      setLikes(likes + 1);
    }

  }

  return (
    <>
      {post !== null &&
      
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 mb-8">
        {/* 이미지 섹션 */}
        <div className="w-full">
        <Image
          src={`data:image/png;base64,${post.media_data}`} // Base64 encoded image
          alt="게시글 이미지"
          width={384} // w-96 in Tailwind (384px)
          height={0} // Auto height to maintain aspect ratio
          className="mt-4 object-cover mx-auto"
        />
          {/* <img
              src={`data:image/png;base64,${post.media_data}`}
              alt="게시글 이미지"
              className="mt-4 w-96 h-auto object-cover mx-auto"
            /> */}
        </div>
        {/* 본문 내용 */}
        <div className="p-6 ">
          <h1 className="text-2xl font-bold text-gray-900 text-right">{post.title}</h1>
        <p className="text-sm text-gray-500 mt-1 text-right">by {post.nickname} | 좋아요 : {likes}</p>

          {/* 가게 정보 */}
          <div className="flex flex-row justify-between mt-4 bg-gray-100 p-4 rounded-lg">
            <div>
            <p>가게 정보</p>
            <p className="text-lg font-semibold text-gray-700">{post.shop_name}</p>
            <p className="text-sm text-gray-600">{post.address}</p>
            </div>
          <Btn label="좋아요" onClick={addLikes} />

          </div>

          {/* 본문 내용 */}
          <p className="mt-4 text-gray-700">{post.content}</p>
        </div>
      </div>
      }
    </>
  )
}