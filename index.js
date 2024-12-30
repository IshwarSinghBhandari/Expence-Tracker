import express from 'express';
import dotenv from "dotenv"
import cors from "cors";
import  { connect } from './dbconnection/dbconnect.js';
import userroute from './routes/userRoutes.js';
import expenceroute from './routes/expenceRoute.js';


dotenv.config();
const app = express();
const PORT=process.env.PORT || 9000

app.use(cors());

app.use(express.json());
app.set('view engine', 'ejs'); 
app.use('/api/users',userroute); 
app.use('/api/expences',expenceroute); 


app.get('/', (req, res) => {
        res.status(200).json({message:"Server Started",Frontend:"https://expence-tracker-frontend.vercel.app/"});

})

  connect()
app.listen(PORT, (err) => {
    

    if (err) {
      console.error(`Error starting server: ${err.message}`);
    } else {
      console.log(`Server is listening on port ${PORT}`);
    }
  });
