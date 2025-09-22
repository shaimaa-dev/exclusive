
export const initialState = {
  categories: [],
  products: {
    productslist: [],
    pages: 0,
    page: 1
  },
  Flashproducts: [],
  BestProducts: [],
  ExploreProducts: [],
  wishListProducts: JSON.parse(localStorage.getItem("wishlist")) || [],
  cartProducts: JSON.parse(localStorage.getItem("cart")) || [],
  selectedProduct: null,
  isOpen: false,
  user: null
};
const bestSallerFilter = (data) => {
  return data.filter((product) => product.rating >= 4.5);
}
const addToWishList = (state, action) => {
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
    case "ADD_EXPLORE_PRODUCTS":
      return {
        ...state,
        ExploreProducts: action.payload
      }
    case "ADD_PRODUCTS":
      return {
        ...state,
        products: { ...state.products, ...action.payload }
      }
    case "SET_PAGE":
      return {
        ...state,
        products: { ...state.products, page: action.payload }
      };
    case "ADD_TO_WISHLIST_PRODUCTS": {
      const newState = addToWishList(state, action);
      localStorage.setItem("wishlist", JSON.stringify(newState.wishListProducts));
      return newState;
    }
    case "REMOVE_PRODUCT_FROM_WISHLIST": {
      const newWishList = state.wishListProducts.filter(
        (product) => product.id !== action.payload.id
      );
      localStorage.setItem("wishlist", JSON.stringify(newWishList));
      return {
        ...state,
        wishListProducts: newWishList
      };
    }
    case "ADD_TO_CART": {
      const productInCart = state.cartProducts.find(
        (product) => product.id === action.payload.id
      );
      const priceAfterDiscount = action.payload.discountPercentage > 0
        ? action.payload.price - (action.payload.price * action.payload.discountPercentage / 100)
        : action.payload.price;

      const newCart = productInCart
        ? state.cartProducts.map((product) =>
          product.id === action.payload.id
            ? {
              ...product,
              quantity: product.quantity + 1,
              subtotal: priceAfterDiscount * (product.quantity + 1)
            }
            : product
        )
        : [
          ...state.cartProducts,
          { ...action.payload, quantity: 1, subtotal: priceAfterDiscount }
        ];

      localStorage.setItem("cart", JSON.stringify(newCart));

      return {
        ...state,
        cartProducts: newCart
      };
    }
    case "INCREASE_CART_QUANTITY": {
      const priceAfterDiscount = action.payload.discountPercentage > 0 ? action.payload.price - (action.payload.price * action.payload.discountPercentage / 100) : action.payload.price;
      const updateCartAfterIncreaseQuantity = state.cartProducts.map((product) => {
        return product.id === action.payload.id ?
          { ...product, quantity: product.quantity + 1, subtotal: priceAfterDiscount * (product.quantity + 1) }
          : product
      })
      localStorage.setItem("cart", JSON.stringify(updateCartAfterIncreaseQuantity));
      return {
        ...state,
        cartProducts: updateCartAfterIncreaseQuantity
      }
    }
    case "DECREASE_CART_QUANTITY": {
      const priceAfterDiscount = action.payload.discountPercentage > 0 ? action.payload.price - (action.payload.price * action.payload.discountPercentage / 100) : action.payload.price;
      const updateCart = state.cartProducts.map((product) => {
        return product.id === action.payload.id ?
          { ...product, quantity: product.quantity - 1, subtotal: priceAfterDiscount * (product.quantity - 1) }
          : product
      })
       localStorage.setItem("cart", JSON.stringify(updateCart));
      return {
        ...state,
        cartProducts: updateCart
      }
    }
    case "REMOVE_PRODUCT_FROM_CART": {
      const updateCart = state.cartProducts.filter((product) => {
        return product.id !== action.payload.id;
      })
      localStorage.setItem("cart", JSON.stringify(updateCart));
      return {
        ...state,
        cartProducts: updateCart
      }
    }
    case "CLEAR_CART": {
      const clearProducts = [];
      localStorage.setItem("cart", JSON.stringify(clearProducts));
      return {
        ...state,
        cartProducts: clearProducts
      }
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
