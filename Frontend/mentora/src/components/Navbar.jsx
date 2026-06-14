import { useState } from "react";
import { Menu, X, LogOut, LayoutDashboard, User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { FaBookOpen } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png"
import { setUserData } from "../redux/userSlice"; 

export default function Navbar() {
  const { userData } = useSelector((state) => state.user);
  const isLoggedIn = !!userData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleMyCourses = () => {
    // console.log("first")
    if (!userData) {
      navigate("/login");
    } else if (userData.role === "educator") {
      navigate("/courses");
    } else {
      navigate("/mycourses");
    }
  };

  const handleLogout = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      console.log(result.data);
      toast.success("Logout Successful");
      dispatch(setUserData(null));
      setDropdown(false);
      navigate("/login"); 
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "All Courses", href: "/allcourses" },
    ...(userData?.role === "educator" ? [{ name: "Created Courses", href: "/courses" }] : [{ name: "My Courses", href: "/mycourses" }]),
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-100">
      <div className="max-w-9xl mx-auto flex justify-between items-center px-5 py-3">
        {/* Logo */}
        <div className="flex flex-row gap-3 items-center">
          <img src={logo} height={30} width={30} alt="Mentora logo" />
          <Link
            to="/"
            className="text-xl md:text-2xl font-extrabold text-indigo-600 hover:text-indigo-700"
          >
            Mentora
          </Link>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.href}
                className="hover:text-indigo-600 transition-all duration-200"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-5">
          {isLoggedIn ? (
            <>
              {userData?.role === "educator" && (
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-gray-700 hover:text-indigo-600"
                >
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
              )}

              <div className="relative">
                <button
                  onClick={() => setDropdown(!dropdown)}
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-white text-sm font-semibold flex items-center justify-center shadow-md hover:scale-105 transition-transform"
                >
                  {userData?.photoUrl ? (
                    <img
                      src={userData.photoUrl}
                      alt="Profile"
                      className="w-[40px] h-[40px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer "
                    />
                  ) : (
                    <div className="w-[40px] h-[40px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer">
                      {userData?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}

                </button>

                {dropdown && (
                  <div className="absolute right-0 mt-3 w-44 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700"
                      onClick={() => setDropdown(false)}
                    >
                      <User size={16} /> Profile
                    </Link>
                    {userData?.role === "educator" ? (
                      <Link
                        to="/courses"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700"
                        onClick={() => setDropdown(false)}
                      >
                        <FaBookOpen size={16} /> Created Courses
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          handleMyCourses();
                          setDropdown(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-50 text-gray-700"
                      >
                        <FaBookOpen size={16} /> My Courses
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-50 text-red-600"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-indigo-600">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-indigo-600"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-sm">
          <ul className="flex flex-col items-center py-4 space-y-4 text-gray-700 font-medium">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className="block hover:text-indigo-600 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            <hr className="w-1/2 border-gray-200" />

            {isLoggedIn ? (
              <>
                {userData?.role === "educator" && (
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 hover:text-indigo-600 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="flex items-center gap-2 hover:text-indigo-600"
                  onClick={() => setOpen(false)}
                >
                  <User size={18} /> Profile
                </Link>

                {userData?.role === "educator" ? (
                  <Link
                    to="/courses"
                    className="flex items-center gap-2 hover:text-indigo-600"
                    onClick={() => setOpen(false)}
                  >
                    <FaBookOpen size={16} /> Created Courses
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      handleMyCourses();
                      setOpen(false);
                    }}
                    className="flex items-center gap-2 hover:text-indigo-600"
                  >
                    <FaBookOpen size={16} /> My Courses
                  </button>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 cursor-pointer transition-colors"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-indigo-600 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
                  onClick={() => setOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
