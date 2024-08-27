import { Request, Response } from "express";
import { InternalServerError, NotFoundError } from "../utils/errorHandler";
import { testimonialService } from "../services/TestimonialService";

export const createTestimonial = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const doc = await testimonialService.create(data);

    return res.status(201).json({
      success: true,
      message: "Created successfully",
      data: doc,
    });
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
};

export const getAllTestimonials = async (req: Request, res: Response) => {
  try {
    const docs = await testimonialService.findAll({});

    return res.status(200).json({
      success: true,
      message: "Fetched successfully",
      data: docs,
    });
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
};

export const getTestimonialById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const doc = await testimonialService.findOne(id);

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

export const updateTestimonialById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedDoc = await testimonialService.update(id, updates);

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

export const deleteTestimonialById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await testimonialService.delete(id);
    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
};
