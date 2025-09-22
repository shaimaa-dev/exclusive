import { createContext } from "react";
import { useReducer, useEffect } from "react";
import AppReducer, { initialState } from "./reducers/AppReducer";
import axios from "axios";

export const AppContext = createContext({});
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  useEffect(() => {
    const fetchCatigories = async () => {
      try {
        const data = await axios.get("https://dummyjson.com/products/categories?limit=10");
        dispatch({ type: "ADD_CATIGORIES", payload: data.data });
      } catch (error) {
        console.log(error);
      }
    }
    fetchCatigories();
  }, [])
  useEffect(() => {
    const fetchData = async (url, action) => {
      try {
        const data = await axios.get(url);
        dispatch({ type: action, payload: data.data.products });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData("https://dummyjson.com/products?sortBy=discountPercentage&order=desc", "ADD_FLASH_PRODUCTS");
    fetchData("https://dummyjson.com/products?sortBy=rating&order=desc", "ADD_BEST_PRODUCTS");
    fetchData("https://dummyjson.com/products/?limit=194", "ADD_EXPLORE_PRODUCTS");
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(`https://dummyjson.com/products?limit=10&skip=${Math.ceil((state.products.page - 1) * 10)}`);
        dispatch({ type: "ADD_PRODUCTS", payload: { productslist: data.data.products, page: state.products.page, pages: Math.ceil(data.data.total / 10) } });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [state.products.page]);
  return (
    <>
      <AppContext.Provider
        value={{
          categories: state.categories,
          dispatch,
          products: state.products,
          FlashProducts: state.Flashproducts,
          BestProducts: state.BestProducts,
          ExploreProducts: state.ExploreProducts,
          selectedProduct: state.selectedProduct,
          isOpen: state.isOpen,
          user: state.user,
          wishListProducts: state.wishListProducts,
          cartProducts: state.cartProducts,
        }}>
        {children}
      </AppContext.Provider>
    </>
  );
};

export default AppProvider;

