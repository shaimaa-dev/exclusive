import { deliverd , services , gurantee } from '../../../assets/index'

const Services = () => {
  return (
    <div className='mb-20 flex flex-col lg:flex-row lg:justify-around items-center w-[85%] mx-auto text-center '>
        <div className='mt-10'>
            <img src={deliverd} className='mx-auto w-16 mb-4' alt='image' />
            <h3 className='text-lg font-bold capitalize mb-2 '>free and fast deliverd</h3>
            <p>free delivery for all orders over $140</p>
        </div>
        <div className='mt-10'>
            <img src={services} className='mx-auto w-16 mb-4' alt='image' />
            <h3 className='text-lg font-bold capitalize mb-2 '>24/7 customer service</h3>
            <p>friendly 24/7 customer support</p>
        </div>
        <div className='mt-10'>
            <img src={gurantee} className='mx-auto w-16 mb-4' alt='image' />
            <h3 className='text-lg font-bold capitalize mb-2 '>money back gurantee</h3>
            <p>we return money within 30 days</p>
        </div>
    </div>
  )
}

export default Services
