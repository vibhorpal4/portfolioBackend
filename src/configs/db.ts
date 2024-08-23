import mongoose from "mongoose";
import { logger } from "../utils/logger";
/**
 * This function connects to a MongoDB database using the provided URI and database name, and logs a
 * success message or retries after a delay if there is an error.
 */

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!, {
      dbName: process.env.MONGO_DB_NAME!,
    });
    logger.info(
      `MongoDB Connected to ${conn.connection.name} database and its host is ${conn.connection.host} `
    );
  } catch (error: any) {
    logger.error(`Error: ${error.message}`);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
