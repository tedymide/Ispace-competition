
import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose'
import cors from'cors'
import user from './routes/User.js'
import cookieParser from'cookie-parser'
import upload from './routes/Upload.js'
import bodyParser from 'body-parser';

dotenv.config()


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))



app.use('/api/user', user)
app.use("/api/product", upload)



// connect to mongoDB
const URL = process.env.MONGODB_URL
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

// app.get('/',(req, res)=>{
//     res.json({msg:"welcome to home page"})
// })


const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log('server is running on port', PORT)
})