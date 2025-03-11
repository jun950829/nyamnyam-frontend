import RecipeCard from "./RecipeCard";
import { mockUp } from "@/constants/mockup";

export const RecipePage = () => {

    return (
        <>
            <h1 className="font-bold p-6 text-2xl w-full">
                오늘의 레시피 TOP 3</h1>        
            <div className="flex flex-row items-center justify-center h-screen">
                {mockUp.map((mock, index) => (
                <RecipeCard key={index} mock={mock} />
                ))}
            </div>

            <h1 className="font-bold p-6 text-2xl w-full">
                나의 레시피 자랑 공간</h1>        
            <div className="flex flex-row items-center justify-center h-screen">
                {mockUp.map((mock, index) => (
                <RecipeCard key={index} mock={mock} />
                ))}
            </div>
        </>
    )
}

export default RecipePage;

