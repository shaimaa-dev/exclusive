import { Link, useLocation } from 'react-router-dom'

const NotFoundd = () => {
    const location = useLocation();
    console.log(location);
  return (
    <div className='my-10 w-[85%] mx-auto'>
        <div className='flex gap-3'>
            <Link to='/' className='text-xl text-gray-600'>Home</Link>
            <span>/</span>
            <span>404 error</span>
        </div>
      <h2 className='capitalize text-5xl text-center font-bold my-10 '>404 not found</h2>
      <p className='text-xl mb-14 text-center'>your visited page not found. you may go home page</p>
      <Link to='/' className='py-2 px-4 bg-buttoncolor text-white font-xl block text-center w-fit rounded-md mx-auto mb-10'>back to home page</Link>
    </div>
  )
}

export default NotFoundd
