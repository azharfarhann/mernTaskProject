import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDb from "./utils/dbConnect.js";
import userRouter from "./controllers/public/user/index.js"
dotenv.config();

connectDb()

const app = express()
const PORT = process.env.PORT || 5000;


// midlware
app.use(express.json())
app.use(cors())

// get test route
app.get("/",(req,res)=>{
    res.status(200).json({msg : "test API is Running"})
})


app.use("/api/public/user",userRouter)

app.listen(PORT,()=>{
    console.log(`Server is Running on ${PORT}`)
})

