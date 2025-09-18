import mongoose from "mongoose";
import { db_name } from "../constant.js";

export const db_connected = async () => {
  try {
    const mongoDb_String = `${process.env.MONGODB_URI}/${db_name}`;

    const connectionInstance = await mongoose.connect(mongoDb_String);

    console.log(
    `✅ Database connected successfully!\nDB Host: ${connectionInstance.connection.host}\nDB Name: ${connectionInstance.connection.name}`
    );
  } catch (error) {
    console.error(`❌ Database connection failed: ${error.message}`);
    process.exit(1); // Force exit on failure
  }
};


// In summary:
// exit(0) or process.exit(0): The program or process completed successfully.
// exit(1) or process.exit(1): The program or process terminated due to an error.