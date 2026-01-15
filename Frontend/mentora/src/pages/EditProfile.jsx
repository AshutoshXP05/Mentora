import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Edit3, Mail, User } from "lucide-react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdDescription } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user?.userData);

  const [name, setName] = useState(userData?.name || "");
  const [photo, setPhoto] = useState(userData?.photoUrl || "");
  const [description, setDescription] = useState(userData?.description || "");
  const [loading, setLoading] = useState(false);

  const handleEditProfile = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);

      // Only append file if user selected a new photo
      if (photo instanceof File) {
        formData.append("photoUrl", photo);
      }

      const result = await axios.post(`${serverUrl}/api/user/updateProfile`, formData, {
        withCredentials: true,
      });

      dispatch(setUserData(result.data.user || result.data));
      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3 min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center px-4 py-10">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl relative overflow-hidden">
        {/* Top Gradient with Back Arrow */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl relative">
          <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-md">
            Edit Profile
          </h2>

          <button
            className="absolute top-4 left-4 p-2 rounded-full bg-white hover:bg-gray-100 shadow-md"
            onClick={() => navigate("/profile")}
          >
            <FaArrowLeftLong size={20} color="black" />
          </button>
        </div>

        {/* Profile Image Section */}
        <div className="relative mt-6 flex flex-col items-center px-6 pb-8">
          {photo ? (
            <img
              src={photo instanceof File ? URL.createObjectURL(photo) : photo}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
            />
          ) : (
            <div className="w-28 h-28 flex items-center justify-center text-white text-4xl font-semibold rounded-full border-4 border-white shadow-md bg-gradient-to-r from-gray-800 to-gray-600">
              {name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}

          {/* File input */}
          <label className="mt-4 px-4 py-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 text-sm text-gray-700">
            Choose Profile Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setPhoto(file);
              }}
            />
          </label>

          {/* Name Field */}
          <div className="w-full max-w-md mt-6">
            <label className="block text-gray-700 text-sm mb-1">UserName</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
              <User className="text-blue-600 mr-2" size={18} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="w-full max-w-md mt-4">
            <label className="block text-gray-700 text-sm mb-1">Email Address</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
              <Mail className="text-blue-600 mr-2" size={18} />
              <input
                readOnly
                type="email"
                placeholder={userData?.email || ""}
                className="w-full outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Bio Field */}
          <div className="w-full max-w-md mt-4">
            <label className="block text-gray-700 text-sm mb-1">Bio</label>
            <div className="flex border border-gray-300 rounded-lg bg-white">
              <div className="flex items-start px-3 py-2">
                <MdDescription className="text-blue-600 mt-1" size={20} />
              </div>
              <textarea
                name="description"
                placeholder="Tell us about yourself"
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="w-full px-2 py-2 outline-none text-gray-700 resize-none rounded-r-lg"
              ></textarea>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleEditProfile}
            className="mt-6 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            disabled={loading}
          >
            <Edit3 size={18} /> {loading ? <ClipLoader size={16} color="white" /> : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;

