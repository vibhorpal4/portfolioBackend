import { Model, Document, FilterQuery, UpdateQuery } from "mongoose";
import { logger } from "../utils/logger";

/**
 * A generic base service class that provides CRUD operations for a given Mongoose model.
 */
class BaseService<T extends Document> {
  protected model: Model<T>;

  /**
   * Constructor to initialize the BaseService with a specific model.
   * @param model - A Mongoose model representing the collection.
   */
  constructor(model: Model<T>) {
    this.model = model;
  }

  /**
   * Asynchronously creates a new document in the collection.
   * @param data - The data to create a new document.
   * @returns The created document.
   */
  async create(data: Partial<T>): Promise<T> {
    try {
      const res = await this.model.create(data);
      return res;
    } catch (error: any) {
      logger.error(`Error: ${error.message}`);
      throw new Error(error.message);
    }
  }

  /**
   * Asynchronously finds a document by its ID.
   * @param id - The ID of the document to find.
   * @returns The found document or null if not found.
   */
  async findOne(id: string): Promise<T | null> {
    try {
      return await this.model.findById(id).select("-password").exec();
    } catch (error: any) {
      logger.error(`Error: ${error.message}`);
      throw new Error(error.message);
    }
  }

  /**
   * Asynchronously finds documents matching a query with pagination.
   * @param query - The query to filter documents.
   * @param limit - The maximum number of documents to return (default: 20).
   * @param skip - The number of documents to skip (default: 0).
   * @returns An array of found documents.
   */
  async findAll(
    query: FilterQuery<T>,
    limit: number = 20,
    skip: number = 0
  ): Promise<T[]> {
    try {
      return await this.model
        .find(query)
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 })
        .exec();
    } catch (error: any) {
      logger.error(`Error: ${error.message}`);
      throw new Error(error.message);
    }
  }

  /**
   * Asynchronously finds a document based on a query.
   * @param query - The query to filter documents.
   * @returns The found document or null if not found.
   */
  async findOneByQuery(query: FilterQuery<T>): Promise<T | null> {
    try {
      return await this.model.findOne(query).exec();
    } catch (error: any) {
      logger.error(`Error: ${error.message}`);
      throw new Error(error.message);
    }
  }

  /**
   * Asynchronously updates a document by its ID.
   * @param id - The ID of the document to update.
   * @param data - The new data to update the document with.
   * @returns The updated document or null if not found.
   */
  async update(id: string, data: UpdateQuery<T>): Promise<T | null> {
    try {
      const doc = await this.model
        .findByIdAndUpdate(id, data, {
          new: true, // Return the updated document
          runValidators: true, // Ensure the updates follow schema rules
        })
        .exec();
      return doc;
    } catch (error: any) {
      logger.error(`Error: ${error.message}`);
      throw new Error(error.message);
    }
  }

  /**
   * Asynchronously performs an aggregation query on the model.
   * @param query - The aggregation pipeline to execute.
   * @returns The result of the aggregation query.
   */
  async aggregate(query: any[]): Promise<any[]> {
    try {
      return await this.model.aggregate(query).exec();
    } catch (error: any) {
      logger.error(`Error: ${error.message}`);
      throw new Error(error.message);
    }
  }

  /**
   * This TypeScript function deletes a document by its ID from a database collection and returns a
   * boolean indicating the success of the operation.
   * @param {string} id - The `delete` method you provided is an asynchronous function that takes a
   * `string` parameter `id`. This method attempts to delete a document from a database using the
   * provided `id`. If the deletion is successful, it returns `true`; otherwise, it returns `false`. If
   * an error occurs during
   * @returns The `delete` method is returning a Promise that resolves to a boolean value. The method
   * attempts to find and delete a document in the database using the provided `id`. If the deletion is
   * successful, it returns `true`, otherwise it returns `false`.
   */
  async delete(id: string): Promise<boolean> {
    try {
      const doc = await this.model.findByIdAndDelete(id).exec();
      return !!doc;
    } catch (error: any) {
      logger.error(`Error: ${error.message}`);
      throw new Error(error.message);
    }
  }
}

export default BaseService;
