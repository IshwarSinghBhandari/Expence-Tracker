import User from "../models/Signup.Model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const salt = parseInt(process.env.SALT,10);
const privateKey=process.env.PKEY;

const SignUp =async (req,res)=>{
    
    const { username, email, password, fullname } = req.body;

    try{
        if (!username) { return res.status(400).json({ message: "UserName is required" }); }
        if (!email) { return res.status(400).json({ message: "Email is required" }); }
        if (!password) { return res.status(400).json({ message: "Password is required" }); }
        if (!fullname) { return res.status(400).json({ message: "Fullname is required" }); }
    
        const existingUser =await User.findOne({email})
        if(existingUser)
        {
            return res.status(200).json({ message:"User already exists"});
        }

        const hashpassword = bcrypt.hashSync(password,salt);
        const newUser = await User.create({ 
            username: username,
            email: email,
            password: hashpassword,
            fullname: fullname,
        })

        const { password: omittedPassword, ...userWithoutPassword } = newUser.toObject();

        let token = jwt.sign({ data: userWithoutPassword }, privateKey, { expiresIn: '5d' });  
         res.status(201).json({message:"Successfully Created User",userWithoutPassword,token});
    
    }
    catch(err){
        console.log("Signup error: " + err);
        res.status(500).json({message: err.message})
    }
}

export default SignUp