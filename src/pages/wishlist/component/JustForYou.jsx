import { Link } from "react-router-dom"
import HeaderSections from "../../home/components/HeaderSections"
import { useMemo } from "react"
import ProductWishList from "./ProductWishList"
import useData from "../../../hooks/useData"
import DialogProducts from "../../products/components/DialogProducts"

const JustForYou = () => {
    const { ExploreProducts, wishListProducts } = useData();
    const productsForYou = useMemo(() => {
        return ExploreProducts.filter((product) =>
            wishListProducts.some((pro) => product.category === pro.category) &&
            product.rating > 4 &&
            !wishListProducts.some((pro) => pro.id === product.id)
        )
    }, [wishListProducts , ExploreProducts])
    console.log(productsForYou, 'product for you')
    const productListForYou = productsForYou.map((product) => {
        return (
            <ProductWishList product={product} key={product.id} showRemove={false} showEye={true} />
        )
    })
    return (
        <div className="w-[85%] mx-auto mb-10">

            {productListForYou.length >= 1 &&
                <>
                    <div className="flex items-center justify-between mb-6 ">
                        <HeaderSections name='just for you' />
                        <Link  to='/products' className='capitalize py-2 px-6 border-[1px] border-black rounded-sm'>
                            see all
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 lgl:grid-cols-5 gap-x-4 gap-y-10">
                        {productListForYou}
                    </div>
                </>
            }
            <DialogProducts /> 
        </div >
    )
}

export default JustForYou
