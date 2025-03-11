/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Btn from "@/components/commons/buttons/Btn";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function MatZip () {
    const router = useRouter();
    const [matzipList, setMatzipList] = useState([]);

    useEffect(() => {
      async function fetchData() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/1`)
        const json = await res.json();

        setMatzipList(json)
        
        console.log('데이터 불러오기', json)
      }
      fetchData();
    },[]);

    return(
      <>
        <div className="w-8/10 p-4 min-h-600 mx-auto">
          <div className="flex flex-row justify-between items-center mt-4">
            <p className="text-2xl text-bold">맛집 공유 POST</p> <Btn label="글쓰기" onClick={() => router.push("matzip/write")} />
          </div>
          {matzipList.map((posts: any, index) => {
            return (
              <div key={index} className="w-full max-w-sm shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow"onClick={() => {
                router.push(`/matzip/${posts.id}`);
              }}>
              {posts.media_data ? (
              <img
                src={`data:image/png;base64,${posts.media_data}`}
                alt="게시글 이미지"
                className="w-full h-48 object-cover"
              />
              ) : (
                <p className="mt-4 text-gray-500">이미지가 없습니다.</p>
              )}

              <p className="text-xl font-bold mb-2">{posts.title}</p>
              <div className="flex items-center text-gray-500 text-sm mb-4">
                <span className="mr-4">by {posts.nickname}</span>
                <span>👍 {posts.likes}</span>
              </div>
              </div>
            )
          })}
        </div>
      </>
    )

}
