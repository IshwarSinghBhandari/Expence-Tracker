
import mongoose from "mongoose";
import dotenv from "dotenv"


dotenv.config();
export const connect =async()=>{
    // const url="mongodb+srv://admin:admin123@mycrud.g4pnc.mongodb.net/Expense"

try{
    await  mongoose.connect(`${process.env.DB_URI}`);
    // await  mongoose.connect(url);
   
    console.log("successfully connected");

}
catch(error){
    console.log(error); 
}
}