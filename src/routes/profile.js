const express = require('express');
const bcrypt = require('bcrypt'); // Importing bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Importing jsonwebtoken for token verification

const profileRouter = express.Router();
const { validateEditProfile } = require('../utils/validations'); // Importing validation checks

const { userAuth } = require('../middlewares/auth'); // Importing the userAuth middleware


profileRouter.get("/profile/view",userAuth, async(req,res) => {
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

profileRouter.patch("/profile/update", userAuth, async (req, res) => {
    try{
        // if the profile data is not valid throw an error
       if(!validateEditProfile(req)){
            throw new Error("Invalid Edit request");
        }
        const loggedInUser = req.user;
       

        Object.keys(req.body).forEach((key)=>loggedInUser[key] = req.body[key]); // Update the user object with the new data
        await loggedInUser.save(); // Save the updated user object to the database

         res.send(`${loggedInUser.name}`, + "your profile updated successfully!!"); // Send the updated user object as the response

       } catch(err){
       
        return res.status(400).send(err.message);

    }
     
});

profileRouter.patch("/profile/updatepassword", userAuth, async(req,res) =>{
        try{
        
        const loggedInUser = req.user; // Get the logged-in user from the request
        const currentPassword = req.body.currentPassword; // Get the current password from the request body
        const newPassword = req.body.newPassword; // Get the new password from the request body

        // Check if the current password matches the user's password (using bcrypt)
        const isMatch = await bcrypt.compare(currentPassword, loggedInUser.password);
        if (!isMatch) {
            return res.status(400).send("Current password is incorrect");
        }
         
        // Update the user's password
        loggedInUser.password = newPassword; // Set the new password
        // console.log("New Password:", loggedInUser.password); // Log the new password (for debugging purposes)
        loggedInUser.password = await bcrypt.hash(newPassword, 10); // Hash the new password before saving
        await loggedInUser.save(); // Save the updated user object to the database
    
         res.send("Password updated successfully!");
    } catch (err) {
        res.status(500).send("Error updating password");
    }
});

module.exports = profileRouter; // Export the profileRouter to use in app.js