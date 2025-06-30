const express = require('express');

const app = express();

// Middleware to parse JSON bodies
app.use("/",(req,res) =>{
    res.send("Welcome to DevTinder API");
})

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
})