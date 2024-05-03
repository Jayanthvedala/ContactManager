const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
//@desc Register a user
//@route POST /api/users/register
//@access public 
const registerUser = asyncHandler(async (req,res) => {
    const {username, email, password} = req.body;
    if (! username || ! email || ! password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userAvailable = await User.findOne({email});  
    if (userAvailable){
        res.status(400);
        throw new Error("User already registered!");
    }
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({username,email,password:hashedPassword});
    // console.log(`User created ${new_user} `);
    // if (new_user) {
    //     res.status(201).json({_id:new_user.id, email: new_user.email,});
    // }
    const new_user=await User.find({email});
    res.status(200).json(new_user);
       
    res.json(new_user);
});

//@desc Login user
//@route POST /api/users/login
//@access public 
const loginUser = asyncHandler(async (req,res) => {
    res.json({message : "login user"});
});

//@desc Current user info
//@route POST /api/users/current
//@access private 
const currentUser = asyncHandler(async (req,res) => {
    res.json({message : "Current user info"});
});

module.exports = {registerUser, loginUser, currentUser};