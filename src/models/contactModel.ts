import { model, Schema } from "mongoose";
import { IContactDocument } from "../interfaces";

const contactSchema = new Schema<IContactDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
  }
);

// Create the model using the schema and interface
const Contact = model<IContactDocument>("Contact", contactSchema);

export default Contact;
