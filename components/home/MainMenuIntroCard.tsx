'use client';

import { HeaderMenuTypes } from "@/constants/types"
import Image from 'next/image';
import { useRouter } from "next/navigation";
import Btn from "../commons/buttons/Btn";

interface HeaderMenuProps {
  menu : HeaderMenuTypes;
  index: number;
}

export const MainMenuIntroCard = ({menu, index} : HeaderMenuProps ) => {
  const router = useRouter();

  const gotoPage = (href: string) => {
    router.push(href);
  }

  if( index % 2 == 0) {
    return (
      <div className="flex flex-row w-1/3 min-w-180 items-center justify-center gap-y-1">
        <div className="flex flex-col justify-center gap-y-2 w-1/2">
          <p className="text-4xl text-bold">{menu.name}</p>
          <p className="text-l text-bold text-gray-400">{menu.description}</p>
          <Btn label="바로가기" onClick={() => gotoPage(menu.href)} className="w-60"/>
        </div>
  
        <div className="relative w-1/2 h-full flex justify-end items-center">
          <Image
            src={menu.image}
            alt="배경 이미지"
            width={300} // 원하는 가로 크기 (px)
            height={300} // 전체 화면 채우기
            objectFit="cover" // 비율 유지하며 꽉 채우기
            className="z-0"
          />
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex flex-row  w-1/3 min-w-180 items-center justify-center gap-y-1">
        <div className="relative w-1/2 h-full flex justify-start items-center">
          <Image
            src={menu.image}
            alt="배경 이미지"
            width={300} // 원하는 가로 크기 (px)
            height={300} // 전체 화면 채우기
            objectFit="cover" // 비율 유지하며 꽉 채우기
            className="z-0"
          />
        </div>
        <div className="flex flex-col justify-center items-end gap-y-2 w-1/2">
          <p className="text-4xl text-bold">{menu.name}</p>
          <p className="text-l text-bold text-gray-400">{menu.description}</p>
          <Btn label="바로가기" onClick={() => gotoPage(menu.href)} className="w-60"/>
        </div>
  
      </div>
    )
  }

}

export default MainMenuIntroCard;