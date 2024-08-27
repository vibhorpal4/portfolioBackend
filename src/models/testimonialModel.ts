import { model, Schema } from "mongoose";
import { ITestimonialDocument } from "../interfaces";

const testimonialSchema = new Schema<ITestimonialDocument>(
  {
    name: { type: String, required: true },
    imageUrl: { type: String },
    position: { type: String, required: true },
    feedback: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
  }
);

// Create the model using the schema and interface
const Testimonial = model<ITestimonialDocument>(
  "Testimonial",
  testimonialSchema
);

export default Testimonial;
