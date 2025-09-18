
export const initialState = {
  categories: [],
  products: [],
  Flashproducts: [],
  BestProducts: [],
  wishListProducts: [],
  cartProducts: [],
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
    case "ADD_PRODUCTS":
      return {
        ...state,
        products: action.payload
      }
    case "ADD_TO_WISHLIST_PRODUCTS":
      return addToWishList(state, action);
    case "REMOVE_PRODUCT_FROM_WISHLIST":
      return {
        ...state,
        wishListProducts: state.wishListProducts.filter((product) => product.id !== action.payload.id)
      }
    case "ADD_TO_CART": {
      const productInCart = state.cartProducts.find((product) => product.id === action.payload.id);
      const priceAfterDiscount = action.payload.discountPercentage > 0
        ? action.payload.price - (action.payload.price * action.payload.discountPercentage / 100)
        : action.payload.price;
      return {
        ...state,
        cartProducts: productInCart
          ? state.cartProducts.map((product) =>
            product.id === action.payload.id
              ? {
                ...product,
                quantity: product.quantity + 1,
                subtotal: priceAfterDiscount * (product.quantity + 1)
              }
              : product
          )
          : [...state.cartProducts, {
            ...action.payload,
            quantity: 1,
            subtotal: priceAfterDiscount
          }]
      }
    }
    case "INCREASE_CART_QUANTITY": {
      const priceAfterDiscount = action.payload.discountPercentage > 0 ? action.payload.price - (action.payload.price * action.payload.discountPercentage / 100) : action.payload.price;
      return {
        ...state,
        cartProducts: state.cartProducts.map((product) => {
          return product.id === action.payload.id ?
            { ...product, quantity: product.quantity + 1, subtotal: priceAfterDiscount * (product.quantity + 1) }
            : product
        })
      }
    }
    case "DECREASE_CART_QUANTITY": {
      const priceAfterDiscount = action.payload.discountPercentage > 0 ? action.payload.price - (action.payload.price * action.payload.discountPercentage / 100) : action.payload.price;
      return {
        ...state,
        cartProducts: state.cartProducts.map((product) => {
          return product.id === action.payload.id ?
            { ...product, quantity: product.quantity - 1, subtotal: priceAfterDiscount * (product.quantity - 1) }
            : product
        })
      }
    }
    case "REMOVE_PRODUCT_FROM_CART": {
      const updateData = state.cartProducts.filter((product) => {
        return product.id !== action.payload.id;
      })
      return {
        ...state,
        cartProducts: updateData
      }
    }
    case "CLEAR_CART":
      return {
        ...state,
        cartProducts: []
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
