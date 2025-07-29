const express = require('express');
const connectDB = require("./config/db")

const app = express();
const cookieParser = require('cookie-parser'); // Importing cookie-parser to handle cookies





app.use(express.json()); // to parse JSON bodie
app.use(cookieParser()); // Use cookie-parser middleware to parse cookies

const authRouter = require('./routes/authRoutes'); // Importing auth routes
const requestRouter = require('./routes/request'); // Importing request routes
const profileRouter = require('./routes/profile'); // Importing profile routes

//defining the routes for each router 
app.use('/', authRouter); 
app.use('/', requestRouter);
app.use('/', profileRouter); 


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
