import { useContext } from "react";
import {AppContext} from "../context/AppContext"

const useData = () => {
  return useContext(AppContext);
};

export default useData;