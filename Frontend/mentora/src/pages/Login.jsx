import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase.js";
export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();   
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  const {email, password} = formData;
  
  const handleLogin = async () => {
    try {
      setLoading(true);
     const result = await axios.post(serverUrl + "/api/auth/login", {email, password}, {withCredentials: true})
     setLoading(false);
     console.log(result.data);
     dispatch(setUserData(result.data.data));
     toast.success("Login Successful")
     navigate("/")
    } 
    catch (error) {
      console.log(error)
      setLoading(false);
      toast.error(error.response.data.message);
    }
  }

  const googleSignUp = async () => {
      try {
        const response = await signInWithPopup(auth, provider);
        let user = response.user;
        let Gname = user.displayName;
        let Gemail = user.email;
        let role = "";
  
        const result = await axios.post(
          serverUrl + "/api/auth/googleauth",
          { name:Gname, email:Gemail, role},
          { withCredentials: true }
        );
        dispatch(setUserData(result.data.data));
        navigate("/");
        toast.success("Login Successful");
      }
       catch (error) {
         console.log(error) 
         toast.error(error.response?.data?.message || "Google Login failed");}
    };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
      <div className="w-full max-w-4xl rounded-2xl shadow-xl bg-white/95 backdrop-blur-md grid md:grid-cols-2 overflow-hidden">
        
        {/* Left Section */}
        <div className="p-6 sm:p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-1">
            Welcome back to <span className="text-indigo-600">Mentora</span>
          </h2>
          <p className="text-gray-500 mb-6 text-sm">
            Login to your account and continue your learning journey.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            {/* Email */}
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

            {/* Password with Eye Toggle */}
            <div>
              <label className="block font-medium text-gray-700">Password</label>
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
                  {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
                </button>
              </div>

              {/* Forgot Password */}
              <div className="text-right mt-2">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-xs text-indigo-600 hover:underline font-medium cursor-pointer"

                >
                  Forgot Password?
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition text-sm cursor-pointer"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? <ClipLoader /> :  "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-4 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-2 text-gray-400 text-xs">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google Login */}
          <button className="w-full py-2.5 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition text-sm font-medium cursor-pointer"
          onClick={googleSignUp}>
            <FcGoogle size={20} />
            Continue with Google
          </button>

          {/* Signup Link */}
          <p className="text-xs text-gray-500 mt-4 text-center">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-indigo-600 hover:underline font-medium"
            >
              Sign up
            </button>
          </p>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 text-white flex-col items-center justify-center p-8">
          <div className="flex flex-col items-center mb-6">
            <img src="/logo.png" alt="Mentora Logo" className="w-16 h-16 mb-4" />
            <h2 className="text-3xl font-bold mb-2">Mentora</h2>
          </div>
          <p className="text-sm text-center opacity-90 max-w-xs">
            Your personalized platform to learn, grow, and succeed with guidance from top mentors.
          </p>
        </div>
      </div>
    </div>
  );
}
