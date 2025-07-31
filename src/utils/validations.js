const validator = require('validator');


const validationChecks = (req) => {
    //check fields that are need to be validated 
    const {name,email,password} = req.body; // destructuring the request body

    // check if name is provided and is a string or valid or not
    if(!name || typeof name !== 'string'){
        throw new Error ("Provide a valid name");
    } else if(name.length < 3 || name.length > 50) { //# thses check should also provide in schema level
        throw new Error("Name should be between 3 to 50 characters");
    }
    // check if email is provided and is a valid email or not
    else if( !validator.isEmail(email)){
        throw new Error("Provide a valid email");
    }else if(!validator.isStrongPassword(password)) {
        throw new Error("Password should be strong");
    }
}

// validation checks to edit profile

const validateEditProfile = (req) =>{
    
    const allowedFieldforUpdate = ["name", "email", "address", "phone", "age","photoUrl", "skills"];

    const isEditAllowed = Object.keys(req.body).every((field) => allowedFieldforUpdate.includes(field));

    return isEditAllowed;
    
};

module.exports = {
    validationChecks,
    validateEditProfile,
 }; // Export the validation function