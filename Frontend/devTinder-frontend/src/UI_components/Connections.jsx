import React, { use, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice.js";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  // console.log("Connections from store:", connections);

  const fetchConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "/users/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(response.data.user));
      console.log(response.data.user);
    } catch (error) {
      console.log("Error while fetching connections", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length === 0) {
    return (
      <div className=" text-gray-400 flex justify-center items-center  mt-12">
        <h1 className="font-bold text-2xl text-gray-200 ">
          No Connections Yet
        </h1>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1 className="from-neutral-200 text-2xl text-center mt-4 mb-6 text-gray-200">
          Connections
        </h1>
      </div>

      {connections.map((connection) => {
        // or ReceiverId depending on your logic
        const { name, photoUrl, desc, age, skills } = connection;

        return (
          // <div className="border p-4 m-4 rounded-lg bg-base-300">
          //   <img className="w-32 h-32 rounded-full mb-4  object-cover"
          //   src = {photoUrl}
          //   alt = "photo"
          //   />

          //   <h2 className="text-xl font-bold mb-2">{name}</h2>
          //   <p className="mb-2">{about}</p>
          // </div>
          <div className="flex justify-center items-center w-full">

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
                {name}, {age}
              </h2>

              <div className="mb-3">
                <p className="text-sm font-semibold">About</p>
                <hr className="border-gray-600 my-2" />
                <p className="text-sm text-purple-100">{desc}</p>
                <p className="text-sm text-purple-100  font-semibold">
                  skills : {skills}
                </p>
              </div>

              {/* <div className="mb-2">
  <p className="text-sm font-semibold">Skills</p>
  <hr className="border-gray-600 my-2" />
  <p className="text-sm text-purple-100">{skills}</p>
</div> */}

              <div className="card-actions mt-2">
                <button className="btn btn-primary">Chat</button>
              </div>
            </div>
          </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
