import useData from "../../../hooks/useData";
import { IoIosArrowForward } from "react-icons/io";
import Banner from "./banner";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { categories } = useData();
  const navigate = useNavigate()
  const categoriesList = categories.slice(0,9);
  console.log(categoriesList)
  return (
    <div className="flex w-[85%] mx-auto gap-4">
      <div className="hidden lgl:flex flex-col  border-r-2 border-gray-200 w-[30%] gap-1">
        {categoriesList.map((category) => {
          return (
            <div key={category.slug} onClick={() => navigate(`/products/${category.slug}`,{state:{category:category}})} className=" mt-3 flex gap-2 items-center justify-start cursor-pointer">
              <h2>{category.name}</h2>
              <IoIosArrowForward />
            </div>
          )
        })}
      </div>
      <Banner  />
    </div>
  )
}

export default Hero
