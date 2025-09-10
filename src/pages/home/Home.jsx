import Footer from '../../components/Footer';
import BestSallerProducts from './components/BestSallerProducts';
import ExploreProducts from './components/ExploreProducts';
import FlashProducts from './components/FlashProducts';
import Hero from './components/Hero';
import Services from './components/Services';
import SlideCategories from './components/SlideCategories';

const Home = () => {
  return (
    <>
      <div className="">
        <hr />
        <Hero />
        <FlashProducts />
        <BestSallerProducts />
        <SlideCategories />
        <ExploreProducts />
        <Services />
      </div>
    </>
  )
}

export default Home