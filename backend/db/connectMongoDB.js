//Here is where we connect to MongoDB, our DB

import mongoose, { mongo } from "mongoose"

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL) 
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Connection to MongoDB Error", error.message)
    }
}

export default connectMongoDB