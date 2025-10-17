import JustForYou from "./component/JustForYou"
import WishListProducts from "./component/WishListProducts"
import useData from "../../hooks/useData";
import { imgWishlist } from "../../assets";

const WishList = () => {
    const { wishListProducts } = useData();
    return (
        <div className="mt-[100px]">
            {wishListProducts.length > 0 ?
                <>
                    <WishListProducts />
                    <JustForYou /></>
                : <div className="h-[400px] flex items-center justify-center">
                    <img src={imgWishlist} alt="wish list empty" />
                </div>
            }

        </div>
    )
}

export default WishList
