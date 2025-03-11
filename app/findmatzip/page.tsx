'use client';

import KakaoMap from "@/components/findmatzip/KakaoMap";
import "react-kakao-maps-sdk";
import { useRef, useState } from "react";
import Btn from "@/components/commons/buttons/Btn";
import { searchKaKaoPlace } from "@/libs/apis/kakaomapapi";
import { SearchResultsCard } from "@/components/findmatzip/SearchResultCard";

type Place = {
  id: string;
  place_name: string;
  category_name: string;
  phone: string;
  address_name: string;
  place_url: string;
}

export const FindMatZip = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [places, setPlaces] = useState<any>([]);
  const [selected, setSelected] = useState(0);

  const findWithClick = (searchText?: string) => {
    if(!searchText) {
      alert('검색어를 입력해주세요');
      return;
    }
    
    searchKaKaoPlace(searchText, setPlaces);
    if(inputRef.current) {
      inputRef.current.value = searchText;
    }
    setSelected(0);
  }

  const findWithInput = () => {
    if(!inputRef.current) {
      alert('검색어를 입력해주세요');
      return;
    }

      console.log('검색으로 ', inputRef.current.value)
      searchKaKaoPlace(inputRef.current.value, setPlaces);
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
    </div>
  )
}

export default FindMatZip;