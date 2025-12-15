const jwt=require("jsonwebtoken");

const User=require("../models/user.model");

const authMiddleware=async(req,res,next)=>{
    try{
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization token missing" });
    }
    const token=authHeader.split(" ")[1];
    let payload;
        try {
            payload = jwt.verify(token, process.env.JWT_SECRET);
            } catch (err) {
                return res.status(401).json({ message: "Invalid or expired token" });
            }
    const user = await User.findById(payload.id).select("-password");
    if(!user)
    {
        return res.status(401).json({message:"User not found"});
    }
    req.user=user;
    return next();
}
 catch(err)
{
    console.error("Auth middleware error:", err);
    res.status(500).json({ message: "Server error" });
}
}
module.exports=authMiddleware;