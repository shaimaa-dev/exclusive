import useData from '../../../hooks/useData';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from 'swiper/modules';
import HeaderSections from './HeaderSections';
// import react icons
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import ProductCard from "../../products/components/ProductCard";
import DialogProducts from '../../products/components/DialogProducts';

const BestSallerProducts = () => {
  const { BestProducts } = useData();
    const products = BestProducts;
    const productsWithDiscount = products.map((product) => {
        return (
            <SwiperSlide key={product.id}>
                <ProductCard product={product} haveDiscount={false}/>
            </SwiperSlide>
        )
    })
    return (
        <div className='w-[85%] relative mx-auto mt-24 mb-10'>
            <HeaderSections name={"This Month"} />
            <h2 className='text-3xl font-semibold my-4 capitalize '>best selling products</h2>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                navigation={{
                    nextEl: ".swiper-button-next-best",
                    prevEl: ".swiper-button-prev-best",
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1536: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    }
                }}
                modules={[Navigation,Autoplay]}
                className="mySwiper"
            >
                {productsWithDiscount}
            </Swiper>
            <div className='hidden lg:flex gap-2 absolute right-2 top-10 '>
                <div className="swiper-button-prev-best flex items-center cursor-pointer justify-center bg-slate-100 text-2xl w-10 h-10 rounded-full"><HiMiniArrowLongLeft /></div>
                <div className="swiper-button-next-best flex items-center cursor-pointer justify-center bg-slate-100 text-2xl w-10 h-10 rounded-full"><HiMiniArrowLongRight /></div>
            </div>
            <DialogProducts   />
        </div>
    )
}

export default BestSallerProducts
