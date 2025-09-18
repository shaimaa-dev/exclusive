import React from 'react'
import useData from '../../../hooks/useData';
import { Link } from 'react-router-dom';

const Subtotal = () => {
    const { cartProducts } = useData();
    const subTotalAllProducts = cartProducts?.reduce((subtotal, product) => {
        return subtotal + product.subtotal
    }, 0)
  return (
    <div className="flex flex-col gap-2 border-[1px] mt-10 border-black p-3 w-full lg:w-[50%] mx-auto">
                <h5 className="text-2xl font-semibold py-3">cart total</h5>
                <div className="flex justify-between my-2 pb-2 border-b-[1px] border-black">
                    <p className="text-xl">subtotal:</p>
                    <p className="text-xl">${subTotalAllProducts.toFixed(1)}</p>
                </div>
                <div className="flex justify-between my-2 pb-2 border-b-[1px] border-black">
                    <p className="text-xl">shipping:</p>
                    <p className="text-xl">free</p>
                </div>
                <div className="flex justify-between my-2 pb-2 border-b-[1px] border-black">
                    <p className="text-xl">total:</p>
                    <p className="text-xl">${subTotalAllProducts.toFixed(1)}</p>
                </div>
                <Link to={'/checkout'} className="bg-buttoncolor w-fit mx-auto py-2 px-6 text-white rounded-md">Process to checkout</Link>
            </div>
  )
}

export default Subtotal
