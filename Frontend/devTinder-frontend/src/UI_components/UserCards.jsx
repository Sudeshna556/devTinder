import React from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";


const UserCard = ({user}) => {

  const {_id, name, photoUrl, desc, age, skills} = user;
  
  // Function to handle Ignore and Interested button clicks

  //handle send request

  const dispatch = useDispatch();

  const handleSendRequest = async (status, receiverId) => {
    try{
      const response = await axios.post(
        BASE_URL + "/send-connection-request/"+ status + "/" + receiverId,
        {},
        { withCredentials: true }
      );
      // After sending the request, remove that perticular user from the feed in the UI
      dispatch(removeUserFromFeed(receiverId));
      console.log("Connection request sent successfully", response.data);

    }catch(error){
      console.log("Error while sending connection request", error);
    }
  }
 

  return (
    <div className="flex justify-center items-center p-4 pt-10">
      <div className="card bg-gray-900 shadow-xl w-[330px] h-[520px] flex flex-col overflow-hidden">
        {/* Top half: full image */}
        <figure className=" w-full">
          <img
            className="object-cover w-full h-full"
            // src={zoroImage}
            src = {photoUrl}
            alt="Profile"
          />
        </figure>

        {/* Bottom half: user info */}
        <div className="card-body h-1/2 flex flex-col justify-between text-white ">
          <h2 className="card-title text-xl gap-x-3">
            <span>{name},</span>
            <span>{age}</span>

          </h2>
          <p className="text-sm">{desc}</p>
          <p className="text-sm">{skills}</p>
          {/* <p className="text-sm">{user.desc}</p> */}
          <div className="card-actions justify-center mt-4 my-2 rounded-md ">
            <button className="btn p-3 bg-orange-500 hover:bg-orange-700"
             onClick = {()=>handleSendRequest("ignored", _id)}
            >Ignore</button>
            <button className="btn btn-primary "
             onClick = {()=>handleSendRequest("interested", _id)}
            >Interested</button>
          </div>


        </div>
      </div>
    </div>
  );
};

export default UserCard;

