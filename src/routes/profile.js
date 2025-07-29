const express = require('express');

const profileRoter = express.Router();

const { userAuth } = require('../middlewares/auth'); // Importing the userAuth middleware


profileRoter.get("/profile",userAuth, async(req,res) => {
    try{
        // Extract the token from cookies
        // Assuming you have a middleware to parse cookies, or you can use a library like cookie-parser
       
        // const cookies = req.cookies; 
        // const { token } = cookies; // Extract the token from cookies

        // if(!token){
        //     throw new Error("Invalid Token");
        // }

        // validate my token 
        // const isTokenValid = await jwt.verify(token,'das@mail'); // Verify the token

        // const {_id} = isTokenValid; // Extract the user ID from the token
      
        
        // Find the user by ID
        // const user = await User.findById(_id);
        const user = req.user; 
        res.send(user);

    }catch(err){
        console.error("Error fetching profile:", err);
    }
})

module.exports = profileRoter; // Export the profileRouter to use in app.js