import express from 'express';
import SignUp from '../controller/Signup.Controller.js';
import { Login } from '../controller/Login.Controller.js';

const userroute = express.Router();

userroute
.post('/login',Login)
.post('/signup',SignUp)


export default userroute;