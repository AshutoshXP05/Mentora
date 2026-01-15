import React from "react";
import { MdOutlineCastForEducation } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { SiOpenaccess } from "react-icons/si";
import { GrUserExpert } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";

function Logo() {
  const features = [
    { icon: <MdOutlineCastForEducation />, text: "20k+ Online Courses" },
    { icon: <SiOpenaccess />, text: "Lifetime Access" },
    { icon: <FaSackDollar />, text: "Value for Money" },
    { icon: <GrUserExpert />, text: "Expert Mentors" },
    { icon: <FaUsers />, text: "Community Support" },
  ];

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 opacity-60"></div>
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 px-6 relative z-10">
        {features.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center gap-3 bg-white border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl p-6"
          >
            <div className="text-indigo-600 text-4xl">{item.icon}</div>
            <p className="text-sm md:text-base font-semibold text-gray-800 text-center">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Logo;
