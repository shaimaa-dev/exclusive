import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div className=" bg-black">
            <div className="w-[85%] mx-auto text-white  grid grid-cols-1 lg:grid-cols-2 lgl:grid-cols-4 gap-6 py-20">
            <div>
                <Link to={"/"} className='text-2xl font-semibold mb-4 block capitalize'  >Exclusive</Link>
                <p>We’re here to make your shopping easier, faster, and more enjoyable</p>
            </div>
            <div>
                <h5 className='text-2xl font-semibold mb-4 block capitalize' >support</h5>
                <address className="mb-2 text-lg">
                    111 Bijoy sarani, Dhaka, <br /> DH, 1515, Bangladesh
                 </address>
                <p className="mb-2 text-lg">
                    📧 <a href="mailto:yourmail@example.com" className="hover:underline">exclusive@gmail.com</a>
                </p>
                <p className="mb-2 text-lg">
                    📞 <a href="tel:+201234567890" className="hover:underline">+20 123 456 7890</a>
                </p>
            </div>
            <div>
                <h5 className='text-2xl font-semibold mb-4 block capitalize' >account</h5>
                <div>
                    <Link to="/signup" className="text-lg block mb-1 hover:text-gray-400">Login/register</Link>
                    <Link to="/cart" className="text-lg block mb-1 hover:text-gray-400">cart</Link>
                    <Link to="/wishlist" className="text-lg block mb-1 hover:text-gray-400">wishlist</Link>
                    <Link to="/products" className="text-lg block mb-1 hover:text-gray-400">shop</Link>
                </div>
            </div>
            <div>
                <h5 className='text-2xl font-semibold mb-4 block capitalize' >quick link</h5>
                <div>
                    <Link className="text-lg block mb-1 hover:text-gray-400">privacy policy</Link>
                    <Link className="text-lg block mb-1 hover:text-gray-400">terms of us</Link>
                    <Link className="text-lg block mb-1 hover:text-gray-400">FAQ</Link>
                    <Link className="text-lg block mb-1 hover:text-gray-400">contact</Link>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Footer
