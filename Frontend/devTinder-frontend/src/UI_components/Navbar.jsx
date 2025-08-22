import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";


const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  console.log("User from Redux store:", user);
  
  
//   const user = useSelector((store) => {
//   console.log("Full Redux store:", store);
//   return store.user;
// });

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      // Optionally, you can dispatch an action to clear user data from Redux store here
      dispatch (removeUser())
      return navigate('/login'); // Redirect to login page after logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" to="/">
            DevTinder｡𖦹°‧
          </Link>
        </div>
        {/* if the user is logged in then only show profilelogo and dropdown */}
        {user && (
          <div className="dropdown dropdown-end mx-7  flex ">
            <p className="px-4">Hi, {user.name}</p>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar "
            >
              <div className="w-10 rounded-full  ">
                {/* <img alt="user photo" src={user.photoUrl} /> */}
                <img
                  src={user.photoUrl}
                  onError={(e) => { e.target.src = "/default-avatar.png"; }}
                  alt="Profile"
                />

              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-10 w-52 p-2 shadow"
            >
              <li>
                <Link className="justify-between" to="/profile">
                  Profile
                  {/* <span className="badge">New</span> */}
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};


export default Navbar;
