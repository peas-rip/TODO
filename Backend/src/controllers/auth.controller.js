const User=require("../models/user.model");

const jwt=require("jsonwebtoken");

exports.register=async(req,res)=>
{
    try
    {
        
        const{name,email,password}=req.body;
        const normalizedEmail=email.toLowerCase().trim();
        if(!name||!email||!password)
        {
            return res.status(400).json({message:"All fields required"});
        }
        const existingUser=await User.findOne({email:normalizedEmail});
        if(existingUser) return res.status(400).json({message:"User already exists"});

        const user=await User.create({name,email,password});
        //jwt.sign(payload,secret,{expiresIn});
        const token=jwt.sign(
            {id:user._id,email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );
        res.status(201).json({user:{id:user._id,name:user.name,email:user.email},token});
    } catch(err)
        {
            console.log("MongoDB server failed",err);
            res.status(500).json({message:"Server error"});
        }
}
exports.login=async(req,res)=>
{
    try{
        const {email,password}=req.body;
        const normalizedEmail = email.toLowerCase().trim();

        if(!email||!password)
        {
            return res.status(400).json({message:"Required fields are missing"});
        }
        const user=await User.findOne({email:normalizedEmail});
        if(!user)
        {
            return res.status(400).json({message:"Invalid credentials"});
        }
        const isMatch= await user.comparePassword(password);
        if(!isMatch)
        {
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token=jwt.sign(
            {id:user._id,email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );
        res.status(200).json({user:{id:user._id,name:user.name,email:user.email},token});
    } catch (err)
    {
        console.log("MongoDB server failed",err);
            res.status(500).json({message:"Server error"});
    }
}