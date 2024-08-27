import { Request, Response } from "express";
import { InternalServerError, NotFoundError } from "../utils/errorHandler";
import { projectService } from "../services/ProjectService";
import { UploadedFile } from "express-fileupload";
import { uploadFile } from "../utils/fileUploader";
import { IProject, IProjectDocument } from "../interfaces";

export const createProject = async (req: Request, res: Response) => {
  try {
    const data: IProject = req.body;
    const file = req.files?.image as UploadedFile;

    if (file) {
      const filePath = await uploadFile(file, "projects");
      data.imageUrl = filePath;
    }

    const doc = await projectService.create(data);

    return res.status(201).json({
      success: true,
      message: "Created successfully",
      data: doc,
    });
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
};

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const docs: IProjectDocument[] = await projectService.findAll({});

    return res.status(200).json({
      success: true,
      message: "Fetched successfully",
      data: docs,
    });
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const doc: IProjectDocument | null = await projectService.findOne(id);

    if (!doc) {
      throw new NotFoundError("Not found");
    }

    return res.status(200).json({
      success: true,
      message: "Fetched successfully",
      data: doc,
    });
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
};

export const updateProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates: IProject = req.body;
    if (req.files && req.files.image) {
      const file = req.files.image as UploadedFile;

      const uploadPath = await uploadFile(file, "projects");

      // Add the image path to the updates object
      updates.imageUrl = uploadPath;
    }
    const updatedDoc = await projectService.update(id, updates);

    if (!updatedDoc) {
      throw new NotFoundError("Not found");
    }

    res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: updatedDoc,
    });
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
};

export const deleteProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await projectService.delete(id);
    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
};
