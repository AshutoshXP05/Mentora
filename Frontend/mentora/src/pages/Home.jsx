import React from "react";
import Navbar from "../components/Navbar.jsx";
import Logo from "../components/Logo.jsx";
import HomeImage from "../assets/HomeImage.jpg";
import ExploreCourses from "../components/ExploreCourses.jsx";
import { useNavigate, Link } from "react-router-dom";
import CardPage from "../components/CardPage.jsx";
import About from "../components/About.jsx";
import Footer from "../components/Footer.jsx";
import { useSelector } from "react-redux";
import ReviewPage from "../components/ReviewPage.jsx";
function Home() {
  const { userData } = useSelector((state) => state.user);
  
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (!userData) {
      navigate("/login");
    } else if (userData.role === "educator") {
      navigate("/courses");
    } else {
      navigate("/mycourses");
    }
  };

  return (
    <>
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 max-w-7xl mx-auto px-6 pt-28 md:pt-32 pb-24">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-500 rounded-b-[3rem] -z-10"></div>

        {/* LEFT TEXT SECTION */}
        <div className="flex flex-col gap-6 md:w-1/2 text-white text-center md:text-left justify-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-md">
            Learn, Grow & <span className="text-yellow-300">Achieve More</span>
          </h1>

          <p className="text-indigo-100 text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
            Master skills from world-class mentors and access 20,000+ curated
            courses designed to elevate your career with hands-on learning.
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-4">
            <Link
              to="/allcourses"
              className="bg-white text-indigo-700 font-semibold px-7 py-3 rounded-xl shadow-md hover:bg-gray-100 hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Link>
            <button
              onClick={handleGetStarted}
              className="border border-white text-white px-7 py-3 rounded-xl font-semibold hover:bg-white hover:text-indigo-700 hover:scale-105 transition-all duration-300"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE SECTION — Hidden on Small Screens */}
        <div className="hidden md:flex md:w-1/2 justify-center items-center">
          <div className="relative">
            <img
              src={HomeImage}
              alt="Online Learning Illustration"
              className="w-full max-w-md md:max-w-lg rounded-3xl shadow-2xl border border-white/20"
            />
            {/* Soft Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-3xl blur-lg"></div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <Logo />

      {/* ===== EXPLORE COURSES SECTION ===== */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-5">
            Explore Our <span className="text-indigo-600">Courses</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-14">
            Choose from a wide range of expert-led courses and programs.
            Learn real-world skills that will help you build, innovate, and lead.
          </p>

          <ExploreCourses />

          <CardPage />

          <div className="mt-14">

            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-10 py-3.5 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              onClick={() => navigate("/allcourses")}
            >
              View All Courses →
            </button>
          </div>
        </div>
      </section>
      <About />
      <ReviewPage />
      <Footer />
    </>
  );
}

export default Home;
