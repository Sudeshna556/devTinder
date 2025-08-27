const express = require('express');
const authRouter = express.Router();
const User = require("../models/user"); // Importing the user model
const {validationChecks} = require('../utils/validations'); // Importing the validation function
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




//SignUp api to insert data into the database
authRouter.post("/signup", async(req,res) =>{
    try{
        // validation of data can be done here before saving to the database
        validationChecks(req); // Call the validation function with the request object

        //encryption of password can be done here before saving to the database
        const {name,email,password} = req.body; // Destructuring the request body to get email and password
        const passwordHash = await bcrypt.hash(password,10); // Hashing the password with a salt rounds of 10


        // Creating a new user instance with the provided data
        const user = new User({name , email, password : passwordHash});
        const saveUser = await user.save() // this returns a promise so need to use async-await or .then() to handle the response
        
        const token =   jwt.sign({_id : saveUser._id}, "das@mail") //generating a jwt token for the user
        // res.cookie("token", token); // Set the token in cookies for client-side access
        res.cookie("token", token);


        // add an expiry time to the token

        return res.status(200).json(
            {
                message: "User signed up successfully", 
                 user : saveUser, // avoid returning sensitive data in response,yo can sanitize it
               
            });

        //# In most of the moongose functions (such as save(), connect() etc) when we use them  we need to use async-await 
    
    }catch(err){
        console.error("Error during signup:", err);
        return res.status(500).json({ error: err.message });
    }

});



// login api to authenticate user

authRouter.post('/login',async(req,res) => {
    try{
    const {email,password} = req.body;
    //since user is already signedup now Check if the user exists in the database
    const checkLoginUser = await User.findOne({email:email});
    if(!checkLoginUser){
        return res.status(404).send("User not found, enter valid credentials");
    }
    //compare the pw with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, checkLoginUser.password);
    if(isPasswordValid){
        // If the password is valid, generate a JWT token
        // The token will contain the user ID and can be used for authentication in subsequent requests
        const token = await jwt.sign({_id : checkLoginUser._id}, "das@mail")
        // Set the token in cookies for client-side access
         res.cookie("token",token);

        return res.status(200).json({
            message: "User authenticated successfully!!",
            user : checkLoginUser,
            

        });
      
        
    } else {
        return res.status(401).send("Invalid credentials");
    }
    
    }catch(err){
        return res.status(500).send("could not authenticate user");
    }
   
})


//logout api or clear the cookies

authRouter.post("/logout", async(req,res)=>{
    // Clear the token cookie to log out the user, basically set the cookie to null to clear it
    // This will remove the token from the user's browser, effectively logging them out
    res.cookie("token", null, {
        expires : new Date(Date.now())  // Set the cookie to expire immediately
    })
    res.send("User logged out successfully");
})


module.exports = authRouter; // Export the authRouter to use in app.js