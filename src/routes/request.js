const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middlewares/auth'); // Importing the userAuth middleware
const ConnectionRequest = require('../models/connectionRequest'); // Importing the ConnectionRequestModel
const User = require('../models/user'); // Importing the User model

requestRouter.post("/send-connection-request/:status/:receiverId",userAuth, async (req, res) => {
    try{
        // Extracting senderId from the authenticated user and receiverId from the request parameters
        // and status from the request parameters
        const fromSenderId = req.user._id;
        const toReceiverId = req.params.receiverId;
        const status = req.params.status;

        const allowedStatuses = ['ignored', 'interested']; 

        // Check if the status is valid
        if(!allowedStatuses.includes(status)){
            return res
            .status(400)
            .json({message : "Invalid status type : " + status});
        }
        // Check if the receiver exists
        const toUser = await User.findById(toReceiverId);
        if(!toUser){
            return res.status(404).json({message : "Receiver not found"});
        }


        //check if the connection request already exists that can be from sender to receiver or receiver to sender
        const existingRequest = await ConnectionRequest.findOne({
            $or: [
                { SenderId: fromSenderId, ReceiverId: toReceiverId }, // Request from sender to receiver
                { SenderId: toReceiverId, ReceiverId: fromSenderId } // Request from receiver to sender
            ]
        });
        if (existingRequest) {
            return res.status(400).json({ message: "Connection request already exists" });
        }

        //create a new connection request
        const connectionRequest = new ConnectionRequest({
            SenderId: fromSenderId,
            ReceiverId: toReceiverId,
            status: status
        })
        //save the connection request to the database
        await connectionRequest.save();

        res.json({
            message : "Connection request sent successfully",
            data : connectionRequest
        })

        // res.send(user.name + " has sent a connection request");
    }catch(err){
        res.status(400).send("Error in sending connection request");
    }


});

module.exports = requestRouter; // Export the requestRouter to use in app.js