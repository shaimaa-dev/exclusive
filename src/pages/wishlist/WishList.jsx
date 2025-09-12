import JustForYou from "./component/JustForYou"
import WishListProducts from "./component/WishListProducts"
import useData from "../../hooks/useData";
import { imgWishlist } from "../../assets";

const WishList = () => {
    const { wishListProducts } = useData();
    return (
        <>
            {wishListProducts.length > 0 ?
                <>
                    <WishListProducts />
                    <JustForYou /></>
                : <div className="h-[400px] flex items-center justify-center">
                    {/* <p className="text-xl">You haven’t added any products to your wishlist yet</p> */}
                    <img src={imgWishlist} alt="wish list empty" />
                </div>
            }

        </>
    )
}

export default WishList
