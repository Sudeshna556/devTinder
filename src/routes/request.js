const express = require('express');

const requestRouter = express.Router();
const { userAuth } = require('../middlewares/auth'); // Importing the userAuth middleware

requestRouter.get("/send-connection-request",userAuth, async (req, res) => {
const user = req.user; // Get the authenticated user from the request
console.log("sending a connection request");
res.send(user.name + " has sent a connection request");
});

module.exports = requestRouter; // Export the requestRouter to use in app.js