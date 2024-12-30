import express from 'express';
import authtoken from '../middleware/Token.Middleware.js';
import { addexpence, updateExpense, Viewexpence, ViewSingleexpence } from '../controller/Expence.Controller.js';


const expenceroute = express.Router();

 expenceroute
.post('/addexpence',authtoken,addexpence)
.get('/allexpence',authtoken,Viewexpence)
.get('/singleexpence/:id',authtoken,ViewSingleexpence)
.put('/updateexpence/:id',authtoken,updateExpense)

export default expenceroute;