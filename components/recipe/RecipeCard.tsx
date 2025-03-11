import { mockUpTypes } from "@/constants/types"
import { mock } from "node:test";

interface MockUpProps {
    mock : mockUpTypes;
}

export const RecipeCard = ({mock} : MockUpProps ) => {

return (
    <div className="flex flex-col items-center justify-center h-200">
      <div className="">
        이미지
      </div>
        <div className="">
        {mock.title}
        {mock.user_id}
      </div>
    </div>
    )  
}

export default RecipeCard;