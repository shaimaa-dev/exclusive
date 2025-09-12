import { TbBuildingStore, TbMoneybag } from "react-icons/tb";
import { AiOutlineDollar } from "react-icons/ai";
import { VscGift } from "react-icons/vsc";

const services = [
    {
        icon: <TbBuildingStore className="text-4xl" />,
        number: "10.5k",
        text: "Sellers active on our site",
    },
    {
        icon: <AiOutlineDollar className="text-4xl" />,
        number: "33k",
        text: "Monthly product sale",
    },
    {
        icon: <VscGift className="text-4xl" />,
        number: "45.5k",
        text: "Customers active in our site",
    },
    {
        icon: <TbMoneybag className="text-4xl" />,
        number: "25k",
        text: "Annual gross sale in our site",
    },
];

const SectionServices = () => {
    return (
        <div className="w-[85%] mx-auto my-20 grid grid-cols-1 lg:grid-cols-2 lgl:grid-cols-4 gap-4">
            {services.map((service, i) => (
                <div
                    key={i}
                    className="group cursor-pointer hover:bg-buttoncolor border border-gray hover:rounded-md hover:shadow-md transition-all delay-100"
                >
                    <h2 className="mt-6 mb-4 w-[70px] h-[70px] mx-auto rounded-full bg-black text-white flex items-center justify-center border-[7px] border-gray-400 group-hover:bg-white group-hover:text-black group-hover:border-gray-300">
                        {service.icon}
                    </h2>
                    <h5 className="text-center text-black text-2xl font-bold group-hover:text-white mb-4">
                        {service.number}
                    </h5>
                    <p className="text-center text-black text-xl group-hover:text-white mb-6">
                        {service.text}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default SectionServices;
