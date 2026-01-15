// import React from "react";
// import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
// import logo from "../assets/logo.png"

// function Footer() {
//     const navigate = useNavigate();
//   return (
//     <footer className="bg-gray-900 text-gray-300 py-12">
//       <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
//         {/* === Logo & About === */}

//         <div className="">
//             <img src={logo} alt="" className="" onClick={() => navigate("/")} />
            
       
//           <h2 className="text-2xl font-bold text-white mb-3">Mentora</h2>
//           <p className="text-sm leading-relaxed">
//             Mentora is a modern learning platform helping students and professionals
//             achieve their career goals through expert-led courses and hands-on learning.
//           </p>
//         </div>

//         {/* === Quick Links === */}
//         <div>
//           <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
//           <ul className="space-y-2 text-sm">
//             <li className="hover:text-indigo-500 transition" onClick={()=>navigate("/")}> Home
//             </li>
//             <li className="hover:text-indigo-500 transition" onClick={()=>navigate("/allcourses")}> All Courses
//             </li>
//             <li className="hover:text-indigo-500 transition" onClick={()=>navigate("/login")}> Login
//             </li>
//             <li className="hover:text-indigo-500 transition" onClick={()=>navigate("/profile")}> My Profile
//             </li>
            
//           </ul>
//         </div>

//         <div>
//           <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
//           <ul className="space-y-2 text-sm">
//             <li className="hover:text-indigo-500 transition"> Web Development
//             </li>
//             <li className="hover:text-indigo-500 transition" > App Development
//             </li>
//             <li className="hover:text-indigo-500 transition" > AI/ML
//             </li>
//             <li className="hover:text-indigo-500 transition" > UI/UX Designing
//             </li>
            
//           </ul>
//         </div>

        

//         {/* === Support === */}
//         {/* <div>
//           <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
//           <ul className="space-y-2 text-sm">
//             <li>
//               <a href="/faq" className="hover:text-indigo-500 transition">FAQ</a>
//             </li>
//             <li>
//               <a href="/privacy" className="hover:text-indigo-500 transition">Privacy Policy</a>
//             </li>
//             <li>
//               <a href="/terms" className="hover:text-indigo-500 transition">Terms & Conditions</a>
//             </li>
//           </ul>
//         </div> */}

//         {/* === Contact & Socials === */}
//         {/* <div>
//           <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
//           <p className="text-sm mb-3">📧 support@mentora.com</p>
//           <p className="text-sm mb-6">📍 New Delhi, India</p>

//           <div className="flex items-center gap-4">
//             <a href="#" className="p-2 bg-gray-800 hover:bg-green-600 rounded-full transition">
//               <FaFacebookF size={16} />
//             </a>
//             <a href="#" className="p-2 bg-gray-800 hover:bg-green-600 rounded-full transition">
//               <FaTwitter size={16} />
//             </a>
//             <a href="#" className="p-2 bg-gray-800 hover:bg-green-600 rounded-full transition">
//               <FaLinkedinIn size={16} />
//             </a>
//             <a href="#" className="p-2 bg-gray-800 hover:bg-green-600 rounded-full transition">
//               <FaInstagram size={16} />
//             </a>
//           </div>
//         </div> */}
//       </div>
//       <div className=""> c {new Date().getFullYear()} Learn. All rights reserved </div>

//       {/* === Bottom Section === */}
//       {/* <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
//         © {new Date().getFullYear()} <span className="text-white font-semibold">Mentora</span>. All rights reserved.
//       </div> */}
//     </footer>
//   );
// }

// export default Footer;


import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import logo from "../assets/logo.png";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className=" bg-gray-900 text-gray-300 px-6 sm:px-8 md:px-12 lg:px-20">
      {/* === Main Footer Content === */}
      <div className=" max-w-7xl mx-auto md:px-5 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* === Logo & About === */}
        <div>
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 mb-3 cursor-pointer"
          >
            <img src={logo} alt="Mentora Logo" className="w-10 h-10" />
            <h2 className="text-2xl font-bold text-white tracking-wide">
              Mentora
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            Mentora is a modern learning platform helping students and
            professionals achieve their goals through expert-led courses and
            interactive learning experiences.
          </p>
        </div>

        {/* === Quick Links === */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li
              className="hover:text-green-500 transition cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className="hover:text-green-500 transition cursor-pointer"
              onClick={() => navigate("/allcourses")}
            >
              All Courses
            </li>
            <li
              className="hover:text-green-500 transition cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </li>
            <li
              className="hover:text-green-500 transition cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              My Profile
            </li>
          </ul>
        </div>

        {/* === Categories === */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-green-500 transition cursor-pointer">
              Web Development
            </li>
            <li className="hover:text-green-500 transition cursor-pointer">
              App Development
            </li>
            <li className="hover:text-green-500 transition cursor-pointer">
              AI / ML
            </li>
            <li className="hover:text-green-500 transition cursor-pointer">
              UI / UX Designing
            </li>
          </ul>
        </div>

        {/* === Contact & Socials === */}
        <div className=" space-y-0">
          <h3 className="text-lg font-semibold text-white mb-4">
            Get in Touch
          </h3>
          <p className="text-sm mb-2 break-words">📧 pathakashutoshdmr@gmail.com</p>
          <p className="text-sm mb-2">📧 (+91) 8797212670</p>
          <p className="text-sm mb-6">📍 New Delhi, India</p>

          <div className="flex items-center gap-4">
            {[
              { icon: <FaFacebookF />, link: "#" },
              { icon: <FaTwitter />, link: "#" },
              { icon: <FaLinkedinIn />, link: "#" },
              { icon: <FaInstagram />, link: "#" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.link}
                className="p-2 bg-gray-800 hover:bg-green-600 rounded-full transition duration-300"
              >
                {React.cloneElement(social.icon, { size: 16 })}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* === Divider === */}
      <div className="border-t border-gray-800"></div>

      {/* === Bottom Bar === */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 text-center">
        <p className="w-full md:w-auto mb-2 md:mb-0">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-semibold">Mentora</span>. All rights
          reserved.
        </p>
        <div className="flex gap-6 mt-3 md:mt-0">
          <a href="#" className="hover:text-green-500 transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-green-500 transition">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
