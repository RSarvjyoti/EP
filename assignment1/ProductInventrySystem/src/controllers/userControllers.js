const User = require("../models/userModel");
const bcrypt = require('bcrypt');

const signup = async () => {
    const {name, email, password} = req.body;

    const hashPassword = bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        // Store hash in your password DB.
    });

    try{
        await User.create({
            name,
            email,
            password,
        })
    }catch(err) {

    }
}
 
const signin = async () => {
    try{

    }catch(err) {

    }
}

module.exports = {signup, signin};