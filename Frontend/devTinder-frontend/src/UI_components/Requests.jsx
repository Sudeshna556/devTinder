import React from 'react'
import {useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { setRequests } from "../utils/requestSlice.js";
import { removeRequest } from '../utils/requestSlice.js';


const Requests = () => {

  
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
 
  //accept or reject request function(review/request)

  const handleRequest = async (status, _id) => {
    try{
      const response = await axios.post(
        BASE_URL + "/accept-connection-request/" + status +  "/" + _id,
        {},
        {withCredentials: true},
      )
      // After handling the request, remove that perticular user from the requests list in the UI
      dispatch(removeRequest(_id));
      

    }catch(error){

    }
  }

  const fetchRequests = async () => {
    try {
      const response = await axios.get(BASE_URL + "/check-requests/all-received-requests", {
        withCredentials: true,
      });
      dispatch(setRequests(response.data.data));
      console.log(response.data.data);
    } catch (error) {
      console.log("Error while fetching connections", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);


    if (!requests || requests.length === 0) {
    return (
      <div className=" text-gray-400 flex justify-center items-center  mt-12">
        <h1 className="font-bold text-2xl text-gray-200 ">
          No Requests Found
        </h1>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1 className="from-neutral-200 text-2xl text-center mt-6 mb-4 text-gray-200">
        Connection  Requests
        </h1>
      </div>

      {requests.map((request) => {
      const { _id, name, photoUrl, desc, age, skills } = request.SenderId
;

        return (
          <div key={_id} className="flex justify-center items-center w-full">
            <div className="card-body flex flex-row items-center text-white border p-4 m-4 rounded-lg bg-base-300 w-full max-w-2xl">
              {/* Left: Profile Image */}
              <div className="flex-shrink-0">
                <img
                  className="w-32 h-32 rounded-full object-cover"
                  src={photoUrl}
                  alt="Profile"
                />
              </div>

              {/* Right: User Details */}
              <div className="ml-6 flex flex-col justify-between h-full">
                <h2 className="card-title text-xl mb-2 text-fuchsia-200">
                  {name}
                </h2>

                <div className="mb-3">
                 
                  <hr className="border-gray-600 my-2" />
                  <p className="text-sm text-purple-100">{desc}</p>
                  {/* <p className="text-sm text-purple-100 font-semibold">
                    skills : {skills}
                  </p> */}
                </div>

                <div className="card-actions mt-2 ">
                  <button className="btn btn-primary" onClick={() => handleRequest("accepted",request._id)}>
                   Accept
                  </button>
                  <button className="btn btn-primary" onClick={() => handleRequest("rejected", request._id)}>
                   Reject
                  </button>
                </div>

                
              </div>
            </div>
          </div>
        );
      })}
  
    </div>
  );


}

export default Requests