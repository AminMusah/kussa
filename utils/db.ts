import mongoose from "mongoose";

let isConnected = false;

const connect = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGO_URL) console.log("MONGO_URL is not defined");

  if (isConnected) return console.log("Already connected to MongoDB");
  try {
    await mongoose.connect(process.env.MONGO_URL as string);

    isConnected = true;

    console.log("Connected to MongoDB");
  } catch (error) {
    throw new Error("Connection failed!");
  }
};

export default connect;
