
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styels
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
// import icons
import { FaApple } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
// import images
import { apple } from '../../../assets/index';
import SlideCategories from './SlideCategories';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <>
      <Swiper
        style={{
          '--swiper-pagination-color': '#DB4444',
          '--swiper-pagination-bullet-inactive-color': '#666',
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="mySwiper bg-black text-white mt-4 max-h-fit"
      >
        <SwiperSlide>
          <div className='flex flex-col justify-around items-center  lg:flex-row  '>
            <div className='mt-5 lgl:mt-0 lgl:ml-0'>
              <div className='flex gap-2 justify-center items-center text-center '>
                <FaApple className='text-4xl mdl:text-3xl' />
                <p>iphone 14 series</p>
              </div>
              <h3 className='text-3xl my-3 text-semibold text-center mdl:text-left '>Up to 10% <br />off Voucher</h3>
              <Link to='/products' className='flex gap-3 items-center mt-6 mx-auto mdl:mx-0'>
                <span className='capitalize border-b-2 border-white pb-1'>shop now</span><FaArrowRight />
              </Link>
            </div>
            <div>
              <img src={apple} className='w-[400px] mt-12' alt='banner-img' />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <SlideCategories />
        </SwiperSlide>
      </Swiper>
    </>
  )
}

export default Banner
