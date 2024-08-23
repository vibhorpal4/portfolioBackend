import dotenv from "dotenv";
import server from "./configs/app";
import cluster from "cluster";
import os from "os";
import { logger } from "./utils/logger";
import connectDB from "./configs/db";

const start = async () => {
  if (process.env.NODE_ENV === "production") {
    if (cluster.isMaster) {
      const numCPUs = os.cpus().length;
      console.log({ numCPUs });
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
      cluster.on("exit", (worker, code, signal) => {
        logger.info(`worker ${worker.process.pid} died`);
      });
    } else {
      dotenv.config();
      server.listen(process.env.PORT, async () => {
        try {
          await connectDB();
          logger.info(
            `Server started on port ${process.env.PORT} with pid ${process.pid}`
          );
        } catch (error: any) {
          logger.error(`Error: ${error.message}`);
          process.exit(1);
        }
      });
    }
  } else {
    dotenv.config();
    server.listen(process.env.PORT, async () => {
      try {
        await connectDB();
        logger.info(
          `Server started on port ${process.env.PORT} with pid ${process.pid}`
        );
      } catch (error: any) {
        logger.error(`Error: ${error.message}`);
        process.exit(1);
      }
    });
  }
};

start();
