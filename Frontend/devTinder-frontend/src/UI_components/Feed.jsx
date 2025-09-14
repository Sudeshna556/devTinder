import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { setFeed } from '../utils/feedSlice'; // Import the action to add feed data
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserCard from './UserCards';





const Feed = () => {
  const dispatch = useDispatch();
   const navigate = useNavigate()
  const feed = useSelector((store) => store.feed);

  

  const fetchFeed = async () => {
    
    
    try{
      if(feed) return; // If feed data is already present, no need to fetch again  
      //if feed is null then fetch data
      const response = await axios.get( 
        BASE_URL + "/feed",
       { withCredentials: true } // Include credentials in the request
      )
      console.log("Response headers:", response.headers);
      dispatch(setFeed(response.data))
    }catch(err){
      // console.error("Failed to fetch feed data:", err);
      // Handle error appropriately, e.g., show a notification or alert
      // if (err.response?.status === 401) {       
      //   navigate('/login');
      if (err.status === 401) {
        
        navigate('/login');
      } else {
        
        console.error("Feed fetch error:", err);
        console.log("Error response:", err.response);
      }


    }
    
  }


  // Call fetchFeed when the component mounts
  useEffect(() => {
    fetchFeed();
  }, [])

 

  if(!feed) return; 

  if(!feed || feed.length === 0){
    return (
      <div className=" text-gray-400 flex justify-center items-center  mt-12">
        <h1 className="font-bold text-2xl text-gray-200 ">
          No More Users in the Feed
        </h1>
      </div>
    );
  }



   return (
    <div className="min-h-screen bg-base-300 p-6">
     

      {/* <h1 className="text-2xl font-bold text-center  ">Discover Profiles</h1> */}

      {feed && (
        <div className="justify-items-center">
           <UserCard  user = {feed[0]}/>
        </div>
      ) }
    </div>
  );

}

export default Feed