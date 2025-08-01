const mongoose = require('mongoose');

// connection request b/w two users


//create schema for connection request
const connectionRequestSchema = new mongoose.Schema({


    SenderId : {
        type:mongoose.Schema.Types.ObjectId,
        required: true
    },
    ReceiverId : {
        type : mongoose.Schema.Types.ObjectId,
        required: true
    },
    status : {
        type : String,
        required: true,
        enum :{
        values :  ['ignored', 'interested', 'accepted', 'rejected'],
        default: 'pending',
        message : `{VALUE} is incorrect status type`
    },
}
},
{
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;
    //check if sender and receiver are the same
    if(connectionRequest.SenderId.equals(connectionRequest.ReceiverId)){
        throw new Error("cannot send connection request to yourself");
    }
    next();
})

//create model for connection request
const ConnectionRequestModel = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequestModel; // Export the ConnectionRequestModel to use in other files