/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useRouter } from "next/navigation";
import KakaoMap from "@/components/findmatzip/KakaoMap";
import "react-kakao-maps-sdk";
import { useRef, useState } from "react";
import Btn from "@/components/commons/buttons/Btn";
import { searchKaKaoPlace } from "@/libs/apis/kakaomapapi";
import { SearchResultsCard } from "@/components/findmatzip/SearchResultCard";
import Image from "next/image";

type Place = {
  id: string;
  place_name: string;
  category_name: string;
  phone: string;
  address_name: string;
  place_url: string;
}

export default function FindMatZip() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [places, setPlaces] = useState<any>([]);
  const [selected, setSelected] = useState(0);
  const [posts, setPosts] = useState([]);

  const findWithClick = (searchText?: string) => {
    if(!searchText) {
      alert('검색어를 입력해주세요');
      return;
    }
    
    searchKaKaoPlace(searchText, setPlaces);
    if(inputRef.current) {
      inputRef.current.value = searchText;
    }
    getPostData(searchText);
    setSelected(0);
  }

  const findWithInput = () => {
    if(!inputRef.current) {
      alert('검색어를 입력해주세요');
      return;
    }

      console.log('검색으로 ', inputRef.current.value)
      searchKaKaoPlace(inputRef.current.value, setPlaces);
      getPostData(inputRef.current.value);
  }

  const getPostData = async (shopName: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/shop/${shopName}`)
    const data = await response.json();

    setPosts(data);
  }

  return (
    <div className="min-h-screen max-w-9/10 m-auto">
      <p className="text-center my-4 text-xl">맛집을 검색해보세요!</p>
      <div className="search-field flex flex-row items-center justify-center gap-x-2 p-4">
        <input 
          type="text"
          placeholder="검색어를 입력해주세요.."
          className="w-1/2 md:w-80 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          ref={inputRef}
        />
        <Btn label="검색" size="medium" onClick={findWithInput} />
      </div>
      <div className="w-[calc(100%-10px)] h-[400px] flex flex-row items-center justify-around p-4 border rounded-sm gap-x-4">
        <KakaoMap location={places}/>
        <div className="w-1/2 flex flex-col overflow-y-auto h-full ">
          <div className="border-b border-gray-400 text-right font-bold mr-4">검색 결과!</div>
          { places.length === 0 ?
            <div>검색 결과가 없습니다.</div> 
            :
          places.map((place: Place, index: number) => {
            return (
              <SearchResultsCard key={place.id} place={place} index={index} selected={selected} setSelected={setSelected} onClickHandlr={findWithClick} />
            )
          })}
        </div>

      </div>
      <div className="flex flex-row justify-between items-center mt-4 border-b-1 mb-4 pb-4">
            <p className="text-2xl text-bold">검색과 관련된 Post!</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-4">
      
        { posts.length !== 0 ? posts.map((posts: any, index) => {
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
                    <div className="flex flex-row justify-end items-center text-gray-500 text-sm mb-4">
                      <p className="">by {posts.nickname}</p>
                      <p>👍 {posts.likes}</p>
                    </div>
                  </div>
              </div>
              )
            })
          
            : <p>검색어를 입력하거나 관련 포스트가 없어요...</p>
          
          }
        </div>
    </div>
  )
}
