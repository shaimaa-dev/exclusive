import { aboutImgSide } from "../../../assets";
import BreadCrumb from "../../../components/BreadCrumb"

const OurStory = () => {
    return (
        <>
            <div className="mt-[100px]">
                <BreadCrumb />
            </div>
            <div className="w-[85%]   mx-auto lgl:ml-auto grid grid-cols-1  lgl:grid-cols-2  gap-10 items-center my-6">
                <div>
                    <h2 className="text-4xl font-bold capitalize mb-6">our story</h2>
                    <p className="text-[18px] my-6">
                        Launced in 2015, Exclusive is South Asia’s premier online
                        shopping makterplace with an active presense in Bangladesh.
                        Supported by wide range of tailored marketing, data and service solutions,
                        Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers
                        across the region.
                    </p>
                    <p className="text-[18px] my-6">
                        Exclusive has more than 1 Million products to offer, growing at a very fast.
                        Exclusive offers a diverse assotment in categories ranging  from consumer.
                    </p>
                </div>
                <div>
                    <img className="w-full" src={aboutImgSide} alt="img of our story" />
                </div>
            </div>
        </>
    )
}

export default OurStory
