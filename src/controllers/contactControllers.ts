import { Request, Response } from "express";
import { InternalServerError, NotFoundError } from "../utils/errorHandler";
import { contactService } from "../services/ContactService";

export const createContact = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const doc = await contactService.create(data);

    return res.status(201).json({
      success: true,
      message: "Created successfully",
      data: doc,
    });
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
};

export const getAllContacts = async (req: Request, res: Response) => {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    let skip = (page - 1) * limit;
    const value = req.query.query || "";
    const docs = await contactService.findAll(
      {
        $or: [
          {
            name: { $regex: value, $options: "i" },
          },
          {
            email: { $regex: value, $options: "i" },
          },
          {
            message: { $regex: value, $options: "i" },
          },
        ],
      },
      limit,
      skip
    );

    return res.status(200).json({
      success: true,
      message: "Fetched successfully",
      data: docs,
    });
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
};

export const getContactId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const doc = await contactService.findOne(id);

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
