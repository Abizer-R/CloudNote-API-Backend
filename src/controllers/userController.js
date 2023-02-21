const userModel = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY

const signup = async (req, res) => {
    
    /**
     * This is a 4 step process [See the comments below]
     */
    // [STEP - 0] Extract info from request body
    const {username, email, password} = req.body;
    try {

        // [STEP - 1] Check Existing User
        const existingUser = await userModel.findOne({ email : email})
        if(existingUser) {
            return res.status(400).json({message : "User already exists"})
        }

        // [STEP - 2] Generate Hash Password
        const hashPassword = await bcrypt.hash(password, 10);

        // [STEP - 3] User Creation
        const result = await userModel.create({
            email : email,
            password : hashPassword,
            username : username
        })

        // [STEP - 4] Generate Token
        const token = jwt.sign({ email : result.email, id : result._id }, SECRET_KEY);
        res.status(201).json({user : result, token : token})

    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Something went wrong"})
    }
    
}

const signin = async (req, res) => {
    
    const {email, password} = req.body;

    try {
        // Checking if user exists or not
        const existingUser = await userModel.findOne({email : email})
        if(!existingUser) {
            return res.status(404).json({message : "User not found"})
        }

        // comparing provided password with hashed password in database
        const matchPassword = await bcrypt.compare(password, existingUser.password)

        if(!matchPassword) {
            return res.status(400).json({message : "Invalid Credentials"})
        }

        const token = jwt.sign({ email : existingUser.email, id : existingUser._id }, SECRET_KEY);
        res.status(200).json({user : existingUser, token : token})

    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Something went wrong"})
    }
}

module.exports = {signup, signin}