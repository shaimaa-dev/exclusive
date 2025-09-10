import useData from "../../../hooks/useData";
import { IoIosArrowForward } from "react-icons/io";
import Banner from "./banner";

const Hero = () => {
  const { categories } = useData();
  const categoriesList = categories.slice(0,9);
  return (
    <div className="flex w-[85%] mx-auto gap-4">
      <div className="hidden lgl:flex flex-col  border-r-2 border-gray-200 w-[30%] gap-1">
        {categoriesList.map((category) => {
          return (
            <div key={category.slug} className=" mt-3 flex gap-2 items-center justify-start cursor-pointer">
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
