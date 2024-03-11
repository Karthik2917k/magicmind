import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbConnection = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(
      `\n MongoDb Connection !! ${connectionInstance.connection.host},${process.env.PORT}`,
      "conection instance"
    );
  } catch (error) {
    console.log("DB connection failed", error);
    process.exit(1);
  }
};

export default dbConnection;
