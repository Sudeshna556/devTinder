const mongoose = require('mongoose');

const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://SudeshnaDas:Fd5lwmMfJ9AfX38m@cluster-1.rd00r.mongodb.net/DevTinder"
        // it connects tp the created cluster and under a single cluster there are multiple projects and each project has its own database

    );
};

module.exports = connectDB;
