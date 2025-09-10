
export const initialState = {
  categories: [],
  products: [],
  Flashproducts: [],
  BestProducts: [],
  wishListProducts: [],
  selectedProduct: null,
  isOpen: false,
  user: null
};
const bestSallerFilter = (data) => {
  return data.filter((product) => product.rating >= 4.5);  
}
const addToWishList = (state,action) => {
   const exists = state.wishListProducts.find((product) => product.id === action.payload.id);
   return {
        ...state,
        wishListProducts: exists ? state.wishListProducts
          : [...state.wishListProducts, action.payload],
      };
}
const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CATIGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "ADD_FLASH_PRODUCTS":
      return {
        ...state,
        Flashproducts: action.payload
      }
    case "ADD_BEST_PRODUCTS":
      return {
        ...state,
        BestProducts: bestSallerFilter(action.payload)
      }
    case "ADD_PRODUCTS":
      return {
        ...state,
        products: action.payload
      }
    case "ADD_TO_WISHLIST_PRODUCTS":
      return addToWishList(state,action);
      case "REMOVE_PRODUCT_FROM_WISHLIST":
        return {
        ...state,
        wishListProducts:state.wishListProducts.filter((product) => product.id !== action.payload.id)
      }
    case "OPEN_DIALOG":
      return {
        ...state,
        selectedProduct: action.payload,
        isOpen: true
      }
    case "CLOSE_PRODUCT":
      return {
        ...state,
        selectedProduct: null,
        isOpen: false
      }
    case "ADD_USER":
      return {
        ...state,
        user: action.payload
      }
    default:
      return state;
  }
};

export default AppReducer;
