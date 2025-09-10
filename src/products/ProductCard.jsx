import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import useData from '../hooks/useData';

const ProductCard = ({ product, haveDiscount }) => {
    const { wishListProducts, dispatch } = useData();
    const discount = product.price - (product.price * product.discountPercentage / 100);
    const isLike = wishListProducts.some((productwish) => productwish.id === product.id)
    const openDialog = (e) => {
        e.preventDefault();
        dispatch({ type: "OPEN_DIALOG", payload: product })
    }
    const toggleWishList = () => {
        if (isLike) {
            dispatch({ type: "REMOVE_PRODUCT_FROM_WISHLIST", payload: product })
        } else {
            dispatch({ type: "ADD_TO_WISHLIST_PRODUCTS", payload: product });
        }
    }

    return (
        <div className='group relative z-30'>
            <Link>
                <div className='bg-[#f5f5f5] h-[250px] flex items-center justify-center'>
                    <img src={product.thumbnail} className='w-[200px]' alt="img-product" />
                </div>
                <h3 className='mt-3 font-medium'>{product.title}</h3>
                <div className="div flex gap-3 mt-2">
                    {product.discountPercentage ?
                        <>
                            <p className='text-buttoncolor'> ${discount.toFixed(2)}</p>
                            <p className='text-gray-600'> ${product.price}</p>
                        </> :
                        <p className='text-buttoncolor'> ${product.price}</p>
                    }
                </div>
                <div className="flex mt-2 gap-1">
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
            </Link>

            {haveDiscount && <div className='bg-buttoncolor px-1 rounded-md absolute left-2 top-2 text-xl text-white '>{product.discountPercentage < 1 ? Math.max(product.discountPercentage).toFixed(2) : Math.max(product.discountPercentage).toFixed(0)}%</div>}
            <div className=' px-2 rounded-md gap-3 absolute right-2 top-2 text-xl text-black  '>

                <button onClick={toggleWishList} className="w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center">
                    {
                        isLike ? <FaHeart className='cursor-pointer text-buttoncolor' />
                            : <CiHeart className='cursor-pointer' />
                    }
                </button>

                <button onClick={openDialog} className="w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center"> <FaEye className='cursor-pointer text-black' /> </button>
            </div>
            <div className='absolute top-[215px] w-[100%]'>
                <button className='btn block w-full mx-auto bg-black text-white py-2 transition-all duration-300 ease-in-out
            opacity-100 translate-y-0 capitalize lgl:opacity-0 lgl:translate-y-5 group-hover:opacity-100 group-hover:translate-y-0'>add to cart</button>
            </div>
        </div>
    )
}

export default ProductCard
