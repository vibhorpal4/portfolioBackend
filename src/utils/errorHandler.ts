import { NextFunction, Request, Response } from "express";

/* The class `BadRequestError` extends the `Error` class and represents an error that occurs when a
client's request is invalid. */
export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
  }
}

/* The class `UnauthorizedError` extends the `Error` class and represents an error related to
unauthorized access. */
export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

/* The class `ForbiddenError` extends the `Error` class and represents a forbidden error with a custom
message. */
export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ForbiddenError";
  }
}

/* The NotFoundError class extends the Error class and represents an error that occurs when a requested
resource is not found. */
export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

/* The InternalServerError class is a custom error class in TypeScript that extends the built-in Error
class and represents an internal server error. */
export class InternalServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InternalServerError";
  }
}

/**
 * This is an error handling middleware function for a TypeScript application that returns appropriate
 * error responses based on the type of error thrown.
 * @param {Error} err - The error object that was thrown or passed to the middleware function.
 * @param {Request} req - req stands for Request and it represents the HTTP request object that is sent
 * by the client to the server. It contains information about the request such as the URL, headers,
 * query parameters, and body.
 * @param {Response} res - `res` stands for response and is an object that represents the HTTP response
 * that an Express app sends when it receives an HTTP request. It contains methods for setting the HTTP
 * status code, headers, and sending the response body. In the context of this error handler, `res` is
 * used to send
 * @param {NextFunction} next - The `next` parameter is a function that is called to pass control to
 * the next middleware function in the stack. It is used to handle errors and pass them to the next
 * error-handling middleware function.
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof BadRequestError) {
    res.status(400).json({
      message: err.message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
      success: false,
    });
  } else if (err instanceof UnauthorizedError) {
    res.status(401).json({
      message: err.message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
      success: false,
    });
  } else if (err instanceof ForbiddenError) {
    res.status(403).json({
      message: err.message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
      success: false,
    });
  } else if (err instanceof NotFoundError) {
    res.status(404).json({
      message: err.message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
      success: false,
    });
  } else if (err instanceof InternalServerError) {
    res.status(500).json({
      message: err.message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
      success: false,
    });
  } else {
    res.status(500).json({
      message: "Internal Server Error",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
      success: false,
    });
  }
};
