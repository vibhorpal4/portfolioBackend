import { createLogger, transports, format } from "winston";
import dotenv from "dotenv";

dotenv.config();

/* This code is creating a logger object using the Winston library in TypeScript. The logger object is
exported as a constant named `logger`. */
export const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});
