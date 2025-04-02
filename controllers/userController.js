const User = require('../models/user');
const bcrypt = require('bcryptjs')

exports.register = async (req,res)=>{
    const {name,email,password} = req.body;
    try{
        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({success:false,message:"user already exits"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt);

        user = await User.create({name,email,hashedpassword});
        return res.status(200).json({success:true,message:"user created"});

    }catch(error){
        console.log(error);
        return res.status(500).json({success:false,message:"server error"});
    }
}

exports.login = async (req,res) =>{
    const {email,password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({success:false,message:"Invalid credentials"});
        }

        const ismatch = await bcrypt.compare(password,user.password);

        if(!ismatch){
            return res.status(401).json({success:false,message:"invalid credentials"});
        }

        return res.status(200).json({success:true,message:"login successfull"})

    }catch(error){
        console.log(error);
        return res.status(500).json({success:false,message:"server error"});
    }
}