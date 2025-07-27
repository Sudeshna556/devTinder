const express = require('express');
const connectDB = require("./config/db")
const User = require("./models/user"); // Importing the user model
const validationChecks = require('./utils/validations'); // Importing the validation function
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser'); // Importing cookie-parser to handle cookies

app.use(express.json()); // to parse JSON bodie
app.use(cookieParser()); // Use cookie-parser middleware to parse cookies


//SignUp api to insert data into the database
app.post("/signup", async(req,res) =>{
    try{
        // validation of data can be done here before saving to the database
        validationChecks(req); // Call the validation function with the request object

        //encryption of password can be done here before saving to the database
        const {name,email,password} = req.body; // Destructuring the request body to get email and password
        const passwordHash = await bcrypt.hash(password,10); // Hashing the password with a salt rounds of 10


        // Creating a new user instance with the provided data
        const user = new User({name , email, password : passwordHash});
        await user.save() // this returns a promise so need to use async-await or .then() to handle the response
        res.send("User added successfully");    

        //# In most of the moongose functions (such as save(), connect() etc) when we use them  we need to use async-await 
    
    }catch(err){
        console.error("Error during signup:", err);
    }

})

// login api to authenticate user

app.post('/login',async(req,res) => {
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
        res.send("User authenticated successfully!!");
    } else {
        return res.status(401).send("Invalid credentials");
    }
    
    }catch(err){
        res.status(500).send("could not authenticate user");
    }
   
})

app.get("/profile",async(req,res) => {
    try{
        // Extract the token from cookies
        // Assuming you have a middleware to parse cookies, or you can use a library like cookie-parser
       
        const cookies = req.cookies; 
        const { token } = cookies; // Extract the token from cookies

        if(!token){
            throw new Error("No token provided");
        }

        //validate my token 
        const isTokenValid = await jwt.verify(token,'das@mail'); // Verify the token

        const {_id} = isTokenValid; // Extract the user ID from the token
        
        // Find the user by ID
        const user = await User.findById(_id);
        res.send(user);

    }catch(err){
        console.error("Error fetching profile:", err);
    }
})

//GET api to Get User data from the database by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.email; // Assuming the email is sent in the request body
    console.log("Received user email:", userEmail);
    try {
        const user = await User.findOne({ email: userEmail });
        
            res.send(user);
        
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});


//GET/feed api to Get all the Users from the databas
app.get("/feed", async (req,res)=>{
    // const findAllUser = req.body
    try{
        const allUsers = await User.find({});
        res.send(allUsers);
    } catch(err){
        res.status(500).send("Internal Server Error");
    }
})

// Update user data 
app.patch("/user/:userId", async(req,res) => {
    const userId = req.params?.userId; // Assuming the user ID is sent in the request parameters
    const data = req.body; // Assuming the update data is sent in the request body
    console.log("Received user ID:", userId);
    console.log("Update data:", data);

    try{
        const allowedUpdates = ["name","email","address","phone","age"]; // Define the allowed fields for update
        // Check if all keys  in data are allowed to update
        const isUpdateAllowed = Object.keys(data).every((key) => allowedUpdates.includes(key));
        if(!isUpdateAllowed) {
            throw new Error("Invalid update fields");
        }
        // Perform the update operation
        const updateUser = await User.findByIdAndUpdate({_id: userId}, data, {
            new: true, // Return the updated document
            runValidators: true // Ensure that the update respects the schema validation
        });
        if(!updateUser) {
            return res.status(404).send("User not found");
        }
        console.log("Updated user data:", updateUser);
        res.send("User updated successfully");
    }catch(error){
        res.sendStatus(400); // Bad Request
        console.error("Update failed:", error);
    }

})


connectDB()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(3000, () => {
            console.log("Server is running on http://localhost:3000");
        });
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err);
    });
