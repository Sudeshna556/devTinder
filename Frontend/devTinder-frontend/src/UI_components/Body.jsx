import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios' 
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice'; // Import the action to add user
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigate for redirection
import { useSelector } from 'react-redux'; // Import useSelector to access Redux store


const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userData = useSelector((store) =>store.user)
  


  const fetchUser = async () => {
    console.log("fetchUser function called");
    if(userData) return ; // If user data is already present, no need to fetch again
    try{

    const response = await axios.get(
      BASE_URL + "/profile/view",
      { withCredentials: true }, // Include credentials in the request
    );

    dispatch(addUser(response.data.user || response.data)); // Dispatch the action to add user data to Redux store
    
  }catch(err) {
    if (err.status === 401) {
    navigate('/login');
  // Redirect to login page if unauthorized
  }
    console.error("Failed to fetch user profile:", err);  
  
  }
}

  // Call fetchUser when the component mounts
  useEffect(() =>{ 
    
      fetchUser(); 
  },[]);

  return (
    <div>
        <Navbar/>
        <div className="pt-16">
          <Outlet/>
        </div>
        {/* The Outlet component is used to render child routes */}
        {/* <Footer/> */}
    </div>
  )

}



export default Body