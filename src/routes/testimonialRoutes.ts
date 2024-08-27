import express from "express";
import {} from "../controllers";
import {
  createTestimonial,
  deleteTestimonialById,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonialById,
} from "../controllers";

const router = express.Router();

router.post("/", createTestimonial);
router.get("/", getAllTestimonials);
router.get("/:id", getTestimonialById);
router.patch("/:id", updateTestimonialById);
router.delete("/:id", deleteTestimonialById);

export default router;
