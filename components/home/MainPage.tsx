import MainMenuIntroCard from "./MainMenuIntroCard";
import { HeaderMenu } from "@/constants/menus";

export const MainPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {HeaderMenu.map((menu, index) => {
        return (
          <MainMenuIntroCard key={index} menu={menu}/>
        )
      })}
    </div>
  )
}

export default MainPage;