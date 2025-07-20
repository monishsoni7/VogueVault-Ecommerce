import mongoose from "mongoose"

const connectDB = async () => {
    
mongoose.connection.on("connected", () => {
    console.log("MongoDB connected")
})

   

    await mongoose.connect(process.env.MONGODB_URI); // Connect to the database without appending the collection name


}
export default connectDB;
