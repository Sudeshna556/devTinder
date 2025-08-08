import React from "react";
import { useState } from "react";

const Login = () => {

  //state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    

    <div className="card card-side shadow-sm bg-neutral-900 w-4xl h-full mx-auto mt-10">
      <figure>
        <img
          className="w-96 h-xl object-cover"
          src="../src/assets/login-bg.jpg"
          alt="Login to devtinder"
        />
      </figure>
      <div className="card-body ml-14">
        <h2 className="card-title justify-center mr-16">Login</h2>
        <p className="card-sm justify-center ml-32">Welcome Back.</p>
        <hr className="mt-2 mb-4 w-84 " />
        <div className="mt-4 ">
          <h2 className="mb-2.5 ">Email</h2>
          <input
            className="input validator"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="mail@site.com"
          />
        </div>

        <div className="mt-4">
          <h2 className="mb-2.5 ">Password</h2>
          <input
            type="password"
            value={password} 
            onChange = {(event) => setPassword(event.target.value)}
            className="input validator"
            required
            placeholder="Password"
            minlength="8"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          />
          <p className="validator-hint">
            Must be more than 8 characters, including
            <br />
            At least one number
            <br />
            At least one lowercase letter
            <br />
            At least one uppercase letter
          </p>
        </div>
        <div className="card-actions justify-center mr-14 mb-3 -mt-4">
          <button className="btn btn-primary">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
