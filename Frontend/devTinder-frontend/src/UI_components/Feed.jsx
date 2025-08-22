import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { setFeed } from '../utils/feedSlice'; // Import the action to add feed data
import { useEffect } from 'react';

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

  const getFeed = async () =>{
    
  }

  // Call fetchFeed when the component mounts
  useEffect(() => {
    fetchFeed();
  }, [])

  return (
    <div>Feed</div>
  )
}

export default Feed