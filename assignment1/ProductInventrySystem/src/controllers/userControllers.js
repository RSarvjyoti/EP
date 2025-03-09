const User = require("../models/userModel");
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    const {name, email, password} = req.body;

    const hashPassword = bcrypt.hash(password, 10);

    try{
        await User.create({
            name,
            email,
            password : hashPassword
        })

        res.status(201).json({ message: "User created successfully", user });
    }catch(err) {
        res.status(500).json({ error: "Error creating user", details: err.message });
    }
}
 
const signin = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = User.find({email});

        if(!user) {
            return res.status(401).json({
                error : "Invailid password"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        res.status(200).json({ message: "Login successful", user });

    }catch(err) {
        res.status(500).json({ error: "Error signing in", details: err.message });
    }
}

module.exports = {signup, signin};