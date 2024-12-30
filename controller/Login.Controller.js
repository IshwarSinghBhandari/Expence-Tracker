import User from "../models/Signup.Model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const privateKey = process.env.PKEY;
export const Login = async(req,res)=>{
    const { email, password } = req.body;

    try{

        if (!email) { return res.status(400).json({ message: "Email is required" }); }
        if (!password) { return res.status(400).json({ message: "Password is required" }); }
       
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: "Invalid email or password" });
        }

        const { password: omittedPassword, ...userWithoutPassword } = existingUser.toObject();

        let token = jwt.sign({ data: userWithoutPassword }, privateKey, { expiresIn: '5d' });
            return res.status(200).json({message:"Successfully Login",isSuccess:true,data:userWithoutPassword,token})

    }
    catch(err){
        console.log("login error: " + err);
        res.status(500).json({message: err.message})
    }
}