// File: server/configs/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connection successfully");
    });
    await mongoose.connect(`${process.env.MONGO_URI}/E-commerce`)
  } catch (error) {
    console.error(error.message);
  }
}

export default connectDB;
