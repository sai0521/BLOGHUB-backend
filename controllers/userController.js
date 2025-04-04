const User = require('../models/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

exports.register = async (req,res)=>{
    const {name,email,password} = req.body;
    console.log(email)
    try{
        const user = await User.findOne({usermail:email});
        

        if(user){
            return res.status(400).json({success:false,message:"user already exits"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt);

        const newUser = await User.create({name,usermail:email,password : hashedpassword});
        return res.status(201).json({success:true,message:"user created"});

    }catch(error){
        console.log(error);
        return res.status(500).json({success:false,message:"server error"});
    }
}

exports.login = async (req,res) =>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({usermail:email});
        if(!user){
            return res.status(401).json({success:false,message:"Invalid credentials"});
        }

        const ismatch = await bcrypt.compare(password,user.password);
       
        if(!ismatch){
            return res.status(401).json({success:false,message:"invalid credentials"});
        }

        const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:"1h"});

        return res.status(200).json({success:true,message:"login successfull",token})

    }catch(error){
        console.log(error);
        return res.status(500).json({success:false,message:"server error"});
    }
}