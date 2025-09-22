import useData from '../../../hooks/useData';
// import icons 
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { IoMdCloseCircle } from "react-icons/io";

const CartProduct = ({product}) => {
    const { dispatch } = useData();
    const increaseQuantity = (product) => {
        dispatch({ type: "INCREASE_CART_QUANTITY", payload: product })
    }
    const decreaseQuantity = (product) => {
        dispatch({ type: "DECREASE_CART_QUANTITY", payload: product })
    }
    const discount = product.price - (product.price * product.discountPercentage / 100);
    return (
        <div>
            <div className=' my-6 rounded-lg bg-white shadow-lg grid grid-cols-1 lg:grid-cols-4 items-center gap-4 p-4'>
                <div className='flex flex-col items-start lgl:flex-row lgl:items-center  mx-0  gap-1 relative '>
                    <img src={product.thumbnail} className='w-[200px] lg:w-[80px] mx-auto lgl:mx-0' alt="product image" />
                    <h3 className="font-semibold text-left">{product.title}</h3>
                    <div onClick={() => dispatch({ type: "REMOVE_PRODUCT_FROM_CART", payload: product })} className="absolute left-0 top-0">
                        <IoMdCloseCircle className="text-red-600 text-xl" />
                    </div>
                </div>
                <p className="visiable lg:hidden">{product.description}</p>
                <div className=" flex lg:hidden mt-1 gap-1">
                    {Array(5).fill(0).map((_, index) => {
                        if (product.rating >= index + 1) {
                            return <FaStar className='text-yellow-300' key={index} />;
                        } else if (product.rating >= index + 0.5) {
                            return <FaStarHalfAlt className='text-yellow-300' key={index} />;
                        } else {
                            return <FaRegStar className='text-gray-400' key={index} />;
                        }
                    })}
                </div>
                <h3 className="text-left lg:text-center font-semibold">price: ${discount.toFixed(1)}</h3>


                <div className=" flex mx-0 lgl:mx-auto  gap-2 w-fit items-center border-[1px] border-black rounded-md py-1 px-3">
                    <button onClick={() => increaseQuantity(product)} ><FaPlus /></button>
                    <p className="ml-0 text-left">{product.quantity}</p>
                    <button onClick={() => decreaseQuantity(product)} disabled={product.quantity === 1} className="disabled:text-gray-500" ><FiMinus /></button>
                </div>
                <h3 className="text-left lg:text-right font-semibold"><span className="visiable lg:hidden text-red-600">subtotal: </span>${product.subtotal.toFixed(2)}</h3>
                <button onClick={() => dispatch({ type: "REMOVE_PRODUCT_FROM_CART", payload: product })} className="visable lg:hidden capitalize py-2 px-4 txt-xl bg-buttoncolor rounded-md w-fit text-white ">remove from cart</button>
            </div>
        </div>
    )
}

export default CartProduct
