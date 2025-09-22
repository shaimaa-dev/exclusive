import useData from "../../../hooks/useData";
import { Link } from "react-router-dom";
import Subtotal from "./Subtotal";
import CartProduct from "./CartProduct";
import CartEmpty from "./CartEmpty";

const CartList = () => {
    const { cartProducts, dispatch } = useData();

    const productsList = cartProducts.map((product) => {
        return <CartProduct key={product.id} product={product} />
    })
    return (
        <>
            {productsList >= 1 ?
                <div className='w-[85%] mx-auto my-20  '>
                    <div className='hidden  lg:grid grid-cols-4 p-4 shadow-md rounded-lg bg-white'>
                        <h3 className='capitalize text-xl'>product</h3>
                        <h3 className='capitalize text-xl text-center'>price</h3>
                        <h3 className='capitalize text-xl text-center'>quentity</h3>
                        <h3 className='capitalize text-xl text-right'>subtotal</h3>
                    </div>
                    {productsList}
                    <div className="flex justify-between">
                        <Link to='/' className="py-1 px-3 capitalize text-xl border-[1px] border-black rounded-sm">return to shop</Link>
                        <button onClick={() => dispatch({ type: "CLEAR_CART" })} className="py-1 px-3 capitalize text-xl border-[1px] border-black rounded-sm">update cart</button>
                    </div>
                    <Subtotal />
                </div> :
                <CartEmpty />
            }
        </>
    )
}

export default CartList
