import React from "react";

const UserCard = ({user}) => {

  const {name, photoUrl, desc, age, skills} = user;

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
            <button className="btn p-3 bg-orange-500 hover:bg-orange-700">Ignore</button>
            <button className="btn btn-primary round-">Interested</button>
          </div>


        </div>
      </div>
    </div>
  );
};

export default UserCard;

