//building a form to edit the profile
import zoro from "../assets/zoro-6.jpeg";
import React, { useState } from "react";
import UserCard from "./UserCards";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age || "");
  const [skills, setSkills] = useState(user.skills.join(", "));
  const [desc, setDesc] = useState(user.desc || "");
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      // const formattedSkills = skills.split(',').map(skill => skill.trim());

      const response = await axios.patch(
        BASE_URL + "/profile/update",
        { name, photoUrl, email, age, skills, desc },
        { withCredentials: true }
      );
      //update the user in redux store
      dispatch(addUser(response.user));

      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      setError(null);


    } catch (err) {
      setError(err.response.user);
    }
  };

  return (
    <>
    <div className="min-h-screen flex items-start md:items-center justify-center p-6 bg-base-100">
      {/* responsive container: column on small, row on md+ */}
      <div className="flex flex-col md:flex-row items-stretch md:items-start gap-10 w-full max-w-6xl">
        {/* left: form panel */}
        <div className="md:w-2/3 bg-base-200 p-8 rounded-xl shadow-lg">
          <div className="flex flex-col items-center mb-6">
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-300 mb-4">
              <img
                src={photoUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
          </div>

          {/* <h2 className="text-xl font-bold mb-6 text-center text-gray-700">Edit Profile</h2> */}
          <hr className="text-gray-200 mb-5" />
          <form className="space-y-6">
            <div>
              <label className="label font-semibold text-gray-600 mb-2.5">
                Email Address
              </label>
              <input
                type="email"
                className="input input-bordered w-full border-gray-700  rounded-xl"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="label font-medium  mb-2.5 text-gray-600">
                Username
              </label>
              <input
                type="text"
                className="input input-bordered w-full border-gray-700  rounded-xl"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Username"
              />
            </div>

            <div>
              <label className="label font-semibold text-gray-600 mb-2.5">
                PhotoURL
              </label>
              <input
                type="text"
                className="input input-bordered w-full border-gray-700  rounded-xl"
                placeholder="Photo URL"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>

            <div>
              <label className="label font-medium text-gray-600 mb-2">
                age
              </label>
              <input
                type="number"
                className="input input-bordered w-full border-gray-700  rounded-xl"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                placeholder="age"
              />
            </div>

            <div>
              <label className="label font-medium text-gray-600 mb-2">
                Skills
              </label>
              <input
                type="text"
                className="input input-bordered w-full border-gray-700  rounded-xl cursor-not-allowed"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Update Skills"
              />
            </div>
            <div>
              <label className="label font-medium text-gray-600 mb-2">
                About
              </label>
              <input
                type="text"
                className="input input-bordered w-full border-gray-700  rounded-xl cursor-not-allowed"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="about"
              />
            </div>
            <p className="text-red-500 text-sm">{error}</p>
            <div className="flex justify-center gap-4 pt-4  ">
              <button
                type="button"
                onClick={saveProfile}
                className="btn btn-primary rounded-2xl"
              >
                Save Changes
              </button>
              {/* <button type="reset" className="btn btn-outline">Cancel</button> */}
            </div>
          </form>
        </div>
        <UserCard user={{ name, photoUrl, email, age, skills, desc }} />
      </div>
      
    </div>
    <div className="toast toast-top toast-center  z-50">
        {showToast && (
          <div className="alert bg-blue-500 shadow-lg ">
            <span className="font-medium text-white">Profile Updated Successfully.</span>
          </div>
        )}  
      </div>
    </>
  );
};

export default EditProfile;
