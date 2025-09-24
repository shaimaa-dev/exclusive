import { Link } from 'react-router-dom'
import { imgslider } from '../../../assets'

const SlideCategories = () => {
    return (
        <div className='bg-black text-white'>
            <div className='flex flex-col justify-around items-center lg:flex-row'>
            <div className='mt-5 lgl:mt-0'>
                <p className='text-semigreen text-center mdl:text-left'>categories</p>
                <h3 className='text-3xl font-semibold capitalize text-center mdl:text-left my-4'>enhance your <br />music experience</h3>
                <Link to='/products' className="capitalize  bg-semigreen py-2 px-4 block w-fit mx-auto text-center mdl:mx-0 cursor-pointer rounded-md hover:bg-[#DB4444] ">
                    buy now
                </Link>
            </div>
            <div className="relative flex justify-center items-center pb-10">
                <div className="absolute w-[300px] h-[250px] top-12 rounded-full bg-[linear-gradient(180deg,#ffffff66,#00000000)] overflow-hidden blur-3xl"></div>
                <img
                    src={imgslider}
                    className="relative w-[350px] lgl:w-[400px] mt-16  ml-3 z-10"
                    alt="banner-img"
                />
            </div>
        </div>
        </div>
    )
}

export default SlideCategories
