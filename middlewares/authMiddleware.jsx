const jwt = require('jsonwebtoken');

exports.protect = (req,res,next ) =>{
    const token = req.header("Authorization");

    if(!token) return res.status(401).json({success:false,message:"Access Denied"});

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;

        next();
    }catch(error){
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
}