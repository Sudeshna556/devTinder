const express = require("express");
const userRouter = express.Router(); 
const { userAuth } = require("../middlewares/auth"); 
const ConnectionRequest = require("../models/connectionRequest");  // Importing the ConnectionRequest model
const User = require("../models/user"); // Importing the User model
const user = require("../models/user");


//GET/feed api to Get all the Users from the databas
userRouter.get("/feed", async (req,res)=>{
    // const findAllUser = req.body
    try{
        const allUsers = await User.find({});
        res.send(allUsers);
        
    } catch(err){
        console.error("Error fetching users:", err);
        res.status(500).send("Internal Server Error");
    }
})


//check all the pending/received connection requests 
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


userRouter.get("/all-connections", async (req, res) => {
    try {
        const allConnections = await ConnectionRequest.find({});
        res.json(allConnections);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});


//check all the sent connection requests to others(who are your existing connections)
userRouter.get("/users/connections",userAuth, async(req,res) =>{
    try{
        const loggedInUserId = req.user; // Get the logged-in user's ID
      

        const userConnections = await ConnectionRequest.find({
            $or: [
                { SenderId: loggedInUserId._id, status :"accepted" }, // Requests sent by the user
                { ReceiverId: loggedInUserId._id, status :"accepted"  }, // Requests received by the user
            ]
        }).populate("SenderId", ["name", "email", "photoUrl", "age", "gender", "skills", "desc"])
        .populate("ReceiverId",["name", "email", "photoUrl","age", "gender", "skills", "desc"]) // Populate senderId with user details

       

        // If no connections found, return an empty array
        if(userConnections.length === 0){
            return res.status(200).json({ message: "No connections found", user: [] });
        }
        // Return the user connections
       const user = userConnections.map((row) => {
        if(row.SenderId._id.toString() === loggedInUserId._id.toString()){
         return row.ReceiverId
        }
         return row.SenderId; // Return the other user's details
       })
      

       res.json({  user });
    }catch(err){
        res.status(400).send("Error in fetching user connections");
    }
});

//check all profiles except those whom the user has already sent connection requests and those who are already connected or rejected
userRouter.get("/users/feed", userAuth, async(req,res) => { // /users/feed?page=1&limit=50
    // check for logged in user
    const loggedInUserId = req.user;
    const page = parseInt(req.query.page) || 1; // Get the skip value from query params, default to 0
    let limit = parseInt(req.query.limit) || 10; // Get the limit value from query params, default to 10
    limit = limit>50 ? 50 : limit; // Limit the maximum number of results to 50

    const skip = (page-1) *limit; // Calculate the skip value for pagination
    

    // find all the connection requests sent by the logged-in user
    const sendRequests = await ConnectionRequest.find({
        $or:[
            {SenderId: loggedInUserId._id}, // Requests sent by the user
            {ReceiverId: loggedInUserId._id} // Requests received by the user
        ]
    }).select("fromUserId   toUserId");

    //hide those users from the feed who have already sent connection requests or are already connected or rejected
    const hideUsersfromFeed = new Set();
    sendRequests.forEach((req) => {
        hideUsersfromFeed.add(req.ReceiverId.toString());
        hideUsersfromFeed.add(req.SenderId.toString());
    });
    console.log("Hide users from feed:", hideUsersfromFeed);

    const users = await User .find({
        $and:
         [
                { _id: { $ne: loggedInUserId._id } }, // Exclude the logged-in user
                { _id: { $nin: Array.from(hideUsersfromFeed) } } // Exclude users already sent requests or connected
        ]           
    })
    .select("name email profilePicture gender skills  about" )
    .skip(skip)
    .limit(limit); // Select only the necessary fields

    res.send(users);;
});

module.exports = userRouter; // Export the userRouter to use in other files