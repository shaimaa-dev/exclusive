import { FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { founder, director, designer } from "../../../assets/index"

const teamMembers = [
    {
        name: "Tom Cruise",
        role: "Founder & Chairman",
        image: founder,
        socials: {
            twitter: "#",
            instagram: "#",
            linkedin: "#",
        },
    },
    {
        name: "Emma Watson",
        role: "Managing Director",
        image: director,
        socials: {
            twitter: "#",
            instagram: "#",
            linkedin: "#",
        },
    },
    {
        name: "Will Smith",
        role: "Product Designer",
        image: designer,
        socials: {
            twitter: "#",
            instagram: "#",
            linkedin: "#",
        },
    },
];

const TeamSection = () => {
    return (
        <div className="w-[85%] mx-auto my-14 grid grid-cols-1 lg:grid-cols-2 lgl:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
                <div key={index} >
                    <div className="bg-[#f5f5f5] flex justify-center pt-4">
                        <img src={member.image} alt="img" />
                    </div>
                    <h2 className="text-2xl font-semibold capitalize mt-5 mb-1">{member.name}</h2>
                    <h6>{member.role}</h6>
                    <div className="mt-4 flex gap-2">
                        <a href={member.socials.twitter}><FaTwitter /></a>
                        <a href={member.socials.instagram}><FaInstagram /></a>
                        <a href={member.socials.linkedin}><FaLinkedinIn /></a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TeamSection;
