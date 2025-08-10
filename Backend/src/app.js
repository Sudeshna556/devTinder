const express = require('express');
const connectDB = require("./config/db")

const app = express();
const cookieParser = require('cookie-parser'); // Importing cookie-parser to handle cookies
const cors = require('cors'); // Importing CORS to handle cross-origin requests

app.use(cors(
    {
        origin: 'http://localhost:5173', // Allow requests from this origin
        credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    }
)); // Use CORS middleware to allow cross-origin requests

app.use(express.json()); // to parse JSON bodie
app.use(cookieParser()); // Use cookie-parser middleware to parse cookies

const authRouter = require('./routes/authRoutes'); // Importing auth routes
const requestRouter = require('./routes/request'); // Importing request routes
const profileRouter = require('./routes/profile'); // Importing profile routes
const userRouter = require('./routes/user'); // Importing user routes

//defining the routes for each router 
app.use('/', authRouter); 
app.use('/', requestRouter);
app.use('/', profileRouter); 
app.use('/', userRouter); // Use the userRouter for user-related routes





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
