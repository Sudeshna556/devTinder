import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { setFeed } from '../utils/feedSlice'; // Import the action to add feed data
import { useEffect } from 'react';
import UserCard from './UserCards';



const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  

  const fetchFeed = async () => {
    try{
        if(feed) return; // If feed data is already present, no need to fetch again
      const response = await axios.get( 
        BASE_URL + "/feed",
       { withCredentials: true } // Include credentials in the request
      )
      dispatch(setFeed(response.data))
    }catch(err){
      console.error("Failed to fetch feed data:", err);
      // Handle error appropriately, e.g., show a notification or alert
    }
    
  }


  // Call fetchFeed when the component mounts
  useEffect(() => {
    fetchFeed();
  }, [])

  //return 
  // feed &&(
    
  //   <div className=''>         
  //     <UserCard  user = {feed[0]}/>
  //   </div>
  // )




   return (
    <div className="min-h-screen bg-base-300 p-6">
      {/* <h1 className="text-2xl font-bold text-center  ">Discover Profiles</h1> */}

      {feed && (
        <div className="justify-items-center">
           <UserCard  user = {feed[5]}/>
        </div>
      ) }
    </div>
  );

}

export default Feed