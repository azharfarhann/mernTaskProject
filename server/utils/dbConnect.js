import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const MONGO_URI = process.env.MONGO_URI;

async function connectDb(){
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Database Connected")
    } catch (error) {
        console.log("database connection error", error.message)
    }
}

export default connectDb