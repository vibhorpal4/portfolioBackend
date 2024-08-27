import { model, Schema } from "mongoose";
import { IProjectDocument } from "../interfaces";

const projectSchema = new Schema<IProjectDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    codeLink: { type: String },
    subTitle: { type: String, required: true },
    techStack: [
      {
        type: String,
      },
    ],
    liveLink: { type: String },
  },
  {
    timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
  }
);

// Create the model using the schema and interface
const Project = model<IProjectDocument>("Project", projectSchema);

export default Project;
