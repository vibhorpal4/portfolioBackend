import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorHandler, NotFoundError } from "../utils/errorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(fileUpload());

app.all("*", (req, res) => {
  throw new NotFoundError("Route not found");
});

app.use(errorHandler);

export default app;
