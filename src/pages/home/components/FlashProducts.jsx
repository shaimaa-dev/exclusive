import useData from '../../../hooks/useData';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import HeaderSections from './HeaderSections';
// import react icons
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import ProductCard from '../../../products/ProductCard';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import DialogProducts from '../../../products/components/DialogProducts';

const FlashProducts = () => {
    const { FlashProducts } = useData();
    const products = FlashProducts.slice(13, 27);
    const [selectedProduct , setSelectedProduct] = useState(null);
    const [isOpen , setIsOpen] = useState(false)
    const productsWithDiscount = products.map((product) => {
        return (
            <SwiperSlide key={product.id}>
                <ProductCard product={product} haveDiscount={true} setSelectedProduct={setSelectedProduct} setIsOpen={setIsOpen} />
            </SwiperSlide>
        )
    })
    return (
        <div className='w-[85%] relative mx-auto mt-24'>
            <HeaderSections name={"today`s"} />
            <h2 className='text-3xl font-semibold my-4 capitalize'>flash sales</h2>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                }}
                modules={[Navigation]}
                className="mySwiper"
            >
                {productsWithDiscount}
            </Swiper>
            <div className='flex gap-2 absolute right-2 top-10'>
                <div className="swiper-button-prev flex items-center cursor-pointer justify-center bg-slate-100 text-2xl w-10 h-10 rounded-full"><HiMiniArrowLongLeft /></div>
                <div className="swiper-button-next flex items-center cursor-pointer justify-center bg-slate-100 text-2xl w-10 h-10 rounded-full"><HiMiniArrowLongRight /></div>
            </div>
            <Link className='capitalize text-white bg-buttoncolor py-2 px-4 rounded-sm block my-6 mx-auto w-fit '>
                view all products
            </Link>
            <DialogProducts selectedProduct={selectedProduct} isOpen={isOpen} setIsOpen={setIsOpen} setSelectedProduct={setSelectedProduct} />
        </div>
    )
}

export default FlashProducts
