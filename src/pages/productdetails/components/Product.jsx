import { FaMinus, FaPlus, FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import BreadCrumb from "../../../components/BreadCrumb"
import useData from "../../../hooks/useData";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
    const { dispatch, wishListProducts } = useData();
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1);
    const increase = () => setQuantity(prev => prev + 1);
    const decrease = () => setQuantity(prev => (prev - 1));
    const BuyProductNow = () => {
        const subtotal = product.price * quantity;
        navigate('/checkout', { state: { product: { ...product, quantity: quantity, subtotal: subtotal } } })
    };
    const isLike = product
        ? wishListProducts.find((productwish) => productwish.id === product.id)
        : null;
    const toggleWishList = () => {
        if (isLike) {
            dispatch({ type: "REMOVE_PRODUCT_FROM_WISHLIST", payload: product })
        } else {
            dispatch({ type: "ADD_TO_WISHLIST_PRODUCTS", payload: product });
        }
    }
    return (
        <>
            {
                !product ? <h1>product loading .....</h1> :
                    <>
                        <BreadCrumb product={product} />
                        <div className="w-[85%] mx-auto grid grid-cols-1 lgl:grid-cols-3 gap-3">
                            <div className="lgl:col-span-2  grid col-1 lgl:grid-cols-3 gap-3 ">
                                <div className="flex lgl:flex-col col-span-1 gap-3">
                                    {product.images.map((img) => {
                                        return (
                                            <div key={img.index} className=" bg-[#f5f5f5] flex items-center justify-center">
                                                <img src={img} className="w-full" alt="product image" />
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                                <div className="bg-[#f5f5f5] flex items-center justify-center col-span-2">
                                    <img src={product.thumbnail} className="w-full" alt="product thumbnail" />
                                </div>
                            </div>
                            <div>
                                <h2 className="font-bold text-2xl">{product.title}</h2>
                                <div className=" flex gap-2 place-items-end mb-2">
                                    <div className="flex mt-3 items-center gap-1">
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
                                    <p className="capitalize">({`${product.reviews.length} reviews`})</p>
                                    <span>|</span>
                                    <p className="text-semigreen" >{product.availabilityStatus}</p>
                                </div>
                                <h5 className="mb-4 font-semibold text-2xl">${product.price}</h5>
                                <p className="mb-3">{product.description}</p>
                                <hr />
                                <div className="flex mt-4 items-center justify-around">
                                    <div className="flex">
                                        <button onClick={decrease} className="border-[1px] border-black disabled:text-gray-500 px-3 py-1" ><FaMinus /></button>
                                        <h2 className="border-[1px] border-black px-3 py-1">{quantity}</h2>
                                        <button onClick={increase} className="border-[1px] border-black px-3 py-1"  ><FaPlus /></button>
                                    </div>
                                    <button className="p-2 bg-buttoncolor  text-white text-xl px-4 rounded-md capitalize " onClick={BuyProductNow}>buy now</button>
                                    <button onClick={toggleWishList} className="w-[30px] h-[30px] rounded-sm bg-white flex items-center justify-center border-[1px] border-black">
                                        {
                                            isLike ? <FaHeart className='cursor-pointer text-buttoncolor' />
                                                : <CiHeart className='cursor-pointer' />
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>
    )

}

export default Product
