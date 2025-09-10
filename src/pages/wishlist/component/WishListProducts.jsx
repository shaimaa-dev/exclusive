import React from 'react'
import useData from '../../../hooks/useData';
import ProductWishList from './ProductWishList';

const WishListProducts = () => {
     const { wishListProducts } = useData();
    const products = wishListProducts.map((product) => {
        return(
            <ProductWishList product={product}  key={product.id} showRemove={true} showEye={false}  />
        )
    })
  return (
    <div className='w-[85%] mx-auto my-20'>
            <div className='flex justify-between '>
                <h3 className='text-2xl'>Wishlist</h3>
                <button className='capitalize py-2 px-6 border-[1px] border-black rounded-sm'>move all to bog</button>
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-3 lgl:grid-cols-5 gap-6 mt-4'>
                {products}
            </div>
        </div>
  )
}

export default WishListProducts
