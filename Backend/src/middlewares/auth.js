const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

const userAuth = async(req, res, next) => {
    try{
        //read the token from the cookies
        const {token} = req.cookies;
        if(!token){
            // return res.status(401).json({ message: 'Unauthorized' });
            return res.status(401).send("please login");
        }
        //verify the token
        const decodeObj = await jwt.verify(token, 'das@mail'); // Use your secret key here
        const {_id} = decodeObj; // Extract the user ID from the token

        // find the user with that id
        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not found");
        }
        req.user = user;
        next();
    }catch(err){
        res.status(401).send("Unauthorized: " + err.message);
    }
} 

module.exports = {userAuth}; // Export the userAuth middleware