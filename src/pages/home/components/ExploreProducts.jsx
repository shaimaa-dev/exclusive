// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';
import { Grid, Navigation } from 'swiper/modules';
import useData from '../../../hooks/useData';
import ProductCard from '../../../products/ProductCard';
import HeaderSections from './HeaderSections';
import { HiMiniArrowLongLeft, HiMiniArrowLongRight } from 'react-icons/hi2';
import DialogProducts from '../../../products/components/DialogProducts';
import axios from 'axios';

const ExploreProducts = () => {
    const { products } = useData();
    const catigory = async () => {
        const ccc = await axios.get("https://dummyjson.com/products/category/beauty");
    }
    catigory()
    const productsWithDiscount = products.map((product) => (
        <SwiperSlide key={product.id}>
            <ProductCard 
                product={product} 
                haveDiscount={false} 
            />
        </SwiperSlide>
    ));

    return (
        <div className='w-[85%] relative mx-auto mt-24 mb-20'>
            <HeaderSections name={"our products"} />
            <h2 className='text-3xl font-semibold my-4 capitalize'>
                explore our products
            </h2>
            <Swiper
                slidesPerView={4}
                navigation={{
                    nextEl: ".swiper-button-next-product",
                    prevEl: ".swiper-button-prev-product",
                }}
                grid={{
                    rows: 2,
                    fill:"row"
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                        grid: { rows: 2, fill: "row" },
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                        grid: { rows: 2, fill: "row" },
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                        grid: { rows: 2, fill: "row" },
                    },
                }}
                spaceBetween={20}
                modules={[Grid , Navigation]} 
                className="mySwiper"
            >
                {productsWithDiscount}
            </Swiper>
            <div className='flex gap-2 absolute right-2 top-10'>
                <div className="swiper-button-prev-product flex items-center cursor-pointer justify-center bg-slate-100 text-2xl w-10 h-10 rounded-full">
                    <HiMiniArrowLongLeft />
                </div>
                <div className="swiper-button-next-product flex items-center cursor-pointer justify-center bg-slate-100 text-2xl w-10 h-10 rounded-full">
                    <HiMiniArrowLongRight />
                </div>
            </div>
            <DialogProducts />
        </div>
    );
};

export default ExploreProducts;
