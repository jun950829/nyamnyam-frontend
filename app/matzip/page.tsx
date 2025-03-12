/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Btn from "@/components/commons/buttons/Btn";
// import useInfiniteScro````ll from "@/components/matzip/InfiniteScroll";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import Image from "next/image";
import useLoginStore from "@/stores/useLoginStore";

type PostType = {
  id:number
  title: string
  media_data: string
  nickname: string
  likes: number
  address: string
  shop_name: string;
  content: string
} | null;

export default function MatZip () {
    const router = useRouter();
    const [matzipList, setMatzipList] = useState([]);
    // const { posts, lastElementRef } = useInfiniteScroll(`${process.env.NEXT_PUBLIC_API_URL}/api/post/page/1`);
    const [topPost, setTopPost] = useState<PostType>(null);
    const isAdmin = useLoginStore((state) => state.isAdmin);


    useEffect(() => {
      async function fetchData() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/1`)
        const json = await res.json();
        setMatzipList(json);
        console.log('데이터 불러오기', json)
      }

      async function getTopPost() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/1/topone`)
        const json = await res.json();

        setTopPost(json);
        console.log('top post 불러오기', json)
      }

      getTopPost();
      fetchData();
    },[]);

    const deletePost = async (id: number) => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/${id}`, {
        method: "DELETE",
      });

      console.log()
      alert('삭제하였습니다')
      window.location.reload();
    }

    return(
      <>
        <div className="w-8/10 p-4 min-h-100 mx-auto">
          <div className="w-full min-h-25 mx-auto max-w-150">
              <p className="text-4xl text-bold py-4">오늘의 맛집 Top1 !!</p>
              {topPost && <div className="flex flex-row justify-between">
                <div>
                <Image
                  src={`data:image/png;base64,${topPost.media_data}`} // Base64 이미지
                  alt="게시글 이미지"
                  width={240} // w-60 (Tailwind width equivalent)
                  height={192} // h-48 (Tailwind height equivalent)
                  className="object-cover"
                />
                </div>
                <div className="max-w-100">
                  <div className="flex flex-row justify-between">
                    <p></p>
                  </div>

                  <p className="text-2xl font-bold mb-2">{topPost.title}</p>
                  <p className="text-xl mb-2 text-gray-700 text-sm line-clamp-2">{topPost.shop_name}</p>
                  <p className="text-l mb-2 text-gray-700 text-sm line-clamp-2">{topPost.content}</p>
                  <div className="flex flex-row justify-end items-center text-gray-500 text-sm mb-4">
                    <span>주소: {topPost.address}</span>
                  </div>
                  <div className="flex flex-row justify-between  items-center text-gray-500 text-sm">
                    <p>좋아요 👍 {topPost.likes} </p>
                    <p className="">by {topPost.nickname}</p>
                  </div>
                  <Btn label="보러가기" onClick={() => {router.push(`/matzip/${topPost.id}`)}} className="w-full mx-auto mt-6"/>
                </div>
                
              </div>}
              
          </div>
          <div className="flex flex-row justify-between items-center mt-4 border-b-1 mb-4 pb-4">
            <p className="text-2xl text-bold">맛집 공유 POST</p> <Btn label="글쓰기" onClick={() => router.push("matzip/write")} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {matzipList.map((posts: any, index) => {
            return (
              
                <div key={index} className="w-full max-w-sm shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow" onClick={() => {
                  router.push(`/matzip/${posts.id}`);
                }}>
                  {posts.media_data ? (
                  <Image
                  src={`data:image/png;base64,${posts.media_data}`} // Base64 image
                  alt="게시글 이미지"
                  width={240} // You can adjust this (default width)
                  height={192} // h-48 (192px)
                  className="w-full object-cover"
                />
                  ) : (
                    <p className="mt-4 text-gray-500">이미지가 없습니다.</p>
                  )}
                  <div className="mx-3">
                    <p className="text-xl font-bold mb-2">{posts.title}</p>
                    <div className="flex flex-row justify-between items-center">
                      {isAdmin && <Btn label="삭제" className="bg-red-400 h-10" onClick={() => {
                          deletePost(posts.id);
                        }} />
                      }

                      <div className="flex flex-row justify-end items-center text-gray-500 text-sm mb-4">
                        <p className="">by {posts.nickname}</p>
                        <p>👍 {posts.likes}</p>
                      </div>
                    </div>
                  </div>
              </div>
              )
            })}
          </div>
        </div>
      </>
    )

}
