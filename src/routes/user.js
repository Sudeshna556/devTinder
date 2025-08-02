const express = require("express");
const userRouter = express.Router(); 
const { userAuth } = require("../middlewares/auth"); 
const ConnectionRequest = require("../models/connectionRequest"); 

userRouter.get("/check-requests/all-received-requests", userAuth, async (req, res) => {
    try {
        // Extracting the logged-in user's ID
        const loggedInUserId = req.user;

        // Fetching all connection requests where the logged-in user is the receiver
        const receivedRequests = await ConnectionRequest.find({
             ReceiverId: loggedInUserId._id, // Using the ID of the logged-in user,
             status : "interested" // Only interested requests
            }).populate("SenderId", ["name", "email", "profilePicture"]); // Populating SenderId with user details (name, email, profilePicture)
            

        // If no requests found, return an empty array
        if (receivedRequests.length === 0) {
            return res.status(200).json({ message: "No connection requests found", data: [] });
        }

        // Return the received connection requests
        res.status(200).json({
            message: "Received connection requests fetched successfully",
            data: receivedRequests
        });

    }catch (err) {
        console.error("Error fetching connection requests:", err);  
        res.status(500).send("Internal Server Error");
    }
});



module.exports = userRouter; // Export the userRouter to use in other files