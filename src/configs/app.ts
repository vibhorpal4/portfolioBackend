import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorHandler, NotFoundError } from "../utils/errorHandler";
import projectRoutes from "../routes/projectRoutes";
import testimonialRoutes from "../routes/testimonialRoutes";
import contactRoutes from "../routes/contactRoutes";
import fs from "fs";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

app.use(fileUpload());

const uploadsDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "..", "uploads"))
);

app.use("/api/projects", projectRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/contacts", contactRoutes);

app.all("*", (req, res) => {
  throw new NotFoundError("Route not found");
});

app.use(errorHandler);

export default app;
