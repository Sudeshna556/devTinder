import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice"; // Import the action to add user
import { useNavigate } from "react-router-dom"; // Import navigate for redirection
import { BASE_URL } from "../utils/constants"; // Import the base URL constant



const Login = () => {
  //state variables
  const [email, setEmail] = useState("zoro@gmail.com");
  const [password, setPassword] = useState("Zoro@1234");
  const [name, setName] = useState("Zoro");
  const [isLoginForm, setIsLoginForm] = useState(false); // if false then signup form else login form
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      ); // Include credentials in the request
      dispatch(addUser(response.data.user || response.data));
      
      //  console.log("Redux after dispatch:", store.getState());
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Login failed. Please try again.");
    }
  };

  const handleSignUp = async() => {
    try{
      const response  = await axios.post(BASE_URL + "/signup",
      {
        name,
        email,
        password
      },
      {withCredentials: true},
      );

     
      
      dispatch(addUser(response.data.user || response.data));

      return navigate("/profile")

    }catch(error){
      setError(error?.response?.data || "Sign Up failed. Please try again.");
    }
  }

  return (
    <div className="card card-side shadow-sm bg-neutral-900 w-4xl h-2/5 mx-auto mt-5 ">
      <figure>
        <img
          className="w-96 h-xl object-cover"
          src="../src/assets/login-bg.jpg"
          alt="Login to devtinder"
        />
      </figure>
      <div className="card-body ml-14">
        <h2 className="card-title justify-center mr-16">
          {/* if the form is login then login else signup */}
          {isLoginForm ? "Login" : "Sign Up"}
        </h2>
        <p className="card-sm justify-center ml-32">Welcome Back.</p>
        <hr className="mt-2 mb-4 w-84 " />

        {!isLoginForm && (
          <div className="mt-3">
            <h2 className="mb-2.5">Name</h2>
            <input
              className="input validator"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
              placeholder="Enter your name"
            />
          </div>
        )}

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
            onChange={(e) => setPassword(e.target.value)}
            className="input validator"
            required
            placeholder="Password"
            minLength={"8"}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          />
          <ul className="validator-hint list-disc pl-3 text-[0.65rem] leading-none space-y-0">
            <li>More than 8 characters</li>
            <li>At least one number</li>
            <li>At least one lowercase letter</li>
            <li>At least one uppercase letter</li>
          </ul>
        </div>
        <p className="text-amber-700 flex justify-center mr-12">{error}</p>
        <div className="card-actions justify-center mr-14  ">
          <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>
            {isLoginForm ? "Login" : "Sign Up"}
          </button>
        </div>

        <p className="flex items-center justify-center gap-1 mt-2.5 mb-2.5 ">
          {isLoginForm ? "Don't have an account?" : "Already have an account?"}
          <button
            className="btn btn-link p-0 h-auto min-h-0 text-blue-600 underline"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
