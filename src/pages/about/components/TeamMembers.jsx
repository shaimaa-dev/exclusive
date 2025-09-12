import { FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const teamMembers = [
  {
    name: "Tom Cruise",
    role: "Founder & Chairman",
    image: "/images/tom.jpg", // حطي اللينك أو استيراد الصورة
    socials: {
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    name: "Emma Watson",
    role: "Managing Director",
    image: "/images/emma.jpg",
    socials: {
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    name: "Will Smith",
    role: "Product Designer",
    image: "/images/will.jpg",
    socials: {
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
];

const TeamMembers = () => {
  return (
    <div className="w-[85%] mx-auto my-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      {teamMembers.map((member, index) => (
        <div key={index} className="text-center shadow-md p-6 rounded-lg">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-[300px] object-cover rounded-md"
          />
          <h3 className="mt-4 text-xl font-bold">{member.name}</h3>
          <p className="text-gray-600">{member.role}</p>
          <div className="flex justify-center gap-4 mt-4 text-gray-600">
            <a href={member.socials.twitter} target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
            <a href={member.socials.instagram} target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href={member.socials.linkedin} target="_blank" rel="noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamSection;
