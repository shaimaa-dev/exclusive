import { Link } from "react-router-dom"
import {cartImage} from "../../../assets/index"

const CartEmpty = () => {
  return (
    <div className="w-[85%] mx-auto">
    <img src={cartImage} alt="cart empty" className="w-[400px] mx-auto"/>
      <h2 className=" text-4xl font-bold text-center my-10">your cart is <span className="text-buttoncolor">empty</span></h2>
      <p className="mb-10 text-center">Must add items on the cart before you proceed to check out.</p>
      <Link to='/' className="bg-buttoncolor py-2 px-4 text-white rounded-xl mb-10 block w-fit mx-auto"> Return to shop</Link>
    </div>
  )
}

export default CartEmpty
