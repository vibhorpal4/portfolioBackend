import express from "express";
import {
  createProject,
  deleteProjectById,
  getAllProjects,
  getProjectById,
  updateProjectById,
} from "../controllers";

const router = express.Router();

router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.patch("/:id", updateProjectById);
router.delete("/:id", deleteProjectById);

export default router;
