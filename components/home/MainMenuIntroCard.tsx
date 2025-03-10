import { HeaderMenuTypes } from "@/constants/types"

interface HeaderMenuProps {
  menu : HeaderMenuTypes;
}

export const MainMenuIntroCard = ({menu} : HeaderMenuProps ) => {

  return (
    <div className="flex flex-row items-center justify-center h-200">
      <div className="">
        이미지
      </div>
      <div className="">
        {menu.name}
        {menu.description}
      </div>
    </div>
  )
}

export default MainMenuIntroCard;