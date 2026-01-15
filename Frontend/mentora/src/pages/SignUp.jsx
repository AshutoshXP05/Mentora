import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { toast, ToastContainer } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase.js";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
  };

  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => { 
    setLoading(true);
    const { name, email, password, role } = formData;
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/signup",
        { name, email, password, role },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      setLoading(false);
      toast.success("Signup Successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const googleSignUp = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      // console.log(response);
      let user = response.user;
      let Gname = user.displayName;
      let Gemail = user.email;

      const result = await axios.post(
        serverUrl + "/api/auth/googleauth",
        { name:Gname, email:Gemail, role:formData.role },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      navigate("/");
      toast.success("Signup Successful");
    }
     catch (error) {
       console.log(error) 
       toast.error(error.response?.data?.message || "Google Sign-In failed");}
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
      <div className="w-full max-w-4xl rounded-2xl shadow-xl bg-white/95 backdrop-blur-md grid md:grid-cols-2 overflow-hidden">
        
        <div className="p-6 sm:p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Welcome to <span className="text-indigo-600">Mentora</span>
          </h2>
          <p className="text-gray-500 mb-4 text-sm">
            Create your account and start your journey today.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3 text-sm">
            <div>
              <label className="block font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {showPassword ? (
                    <IoMdEyeOff size={20} />
                  ) : (
                    <IoMdEye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Role
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "student" })}
                  className={` cursor-pointer px-4 py-2 rounded-full border text-sm transition ${formData.role === "student"
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "educator" })}
                  className={` cursor-pointer px-4 py-2 rounded-full border text-sm transition ${formData.role === "educator"
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  Educator
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition text-sm cursor-pointer"
              onClick={handleSignUp}
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color="white" /> : "Sign Up"}
            </button>
          </form>

          <div className="my-4 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-2 text-gray-400 text-xs">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button
           className="w-full py-2.5 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition text-sm font-medium cursor-pointer"
            onClick={googleSignUp}>
            <FcGoogle size={20} />
            Sign up with Google
          </button>

          <p className="text-xs text-gray-500 mt-4 text-center">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-indigo-600 hover:underline font-medium cursor-pointer"
            >
              Login
            </button>
          </p>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 text-white flex-col items-center justify-center p-8">
          <div className="flex flex-col items-center mb-6">
            <img
              src="/logo.png"
              alt="Mentora Logo"
              className="w-16 h-16 mb-4"
            />
            <h2 className="text-3xl font-bold mb-2">Mentora</h2>
          </div>

          <p className="text-sm text-center opacity-90 max-w-xs">
            Your personalized platform to learn, grow, and succeed with guidance
            from top mentors.
          </p>
        </div>
      </div>
    </div>
  );
}
