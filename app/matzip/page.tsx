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
        <div className="p-4">
          <div className="flex flex-row justify-between items-center">
            <p>맛집 공유 POST</p> <Btn label="글쓰기" onClick={() => router.push("matzip/write")} />
          </div>
          {matzipList.map((posts: any, index) => {
            return (
              <div key={index} onClick={() => {
                router.push(`/matzip/${posts.id}`);
              }}>
                <p>{posts.title}</p>
                {posts.media_data ? (
              <img
                src={`data:image/png;base64,${posts.media_data}`}
                alt="게시글 이미지"
                className="mt-4 w-96 h-auto object-cover"
              />
            ) : (
              <p className="mt-4 text-gray-500">이미지가 없습니다.</p>
            )}
              </div>
            )
          })}
        </div>
      </>
    )

}
