'use client';

import { useEffect } from "react";
import MainMenuIntroCard from "./MainMenuIntroCard";
import { HeaderMenu } from "@/constants/menus";

export const MainPage = () => {
  useEffect(() => {
    
    async function fetchData() {
      const res = await fetch('http://localhost:8080/api/post/id/1')
      const json = await res.json();
      console.log(json);      
      
    }
    
    fetchData();
  })
  
  return (
    <div className="flex flex-col items-center justify-center w-screen max-w-1080px gap-y-6 mb-20">
      {HeaderMenu.map((menu, index) => {
        return (
          <MainMenuIntroCard key={index} menu={menu} index={index}/>
        )
      })}
    </div>
  )
}

export default MainPage;