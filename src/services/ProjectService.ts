import BaseService from "./BaseService";
import Project from "../models/projectModel";
import { IProjectDocument } from "../interfaces";

export default class ProjectService extends BaseService<IProjectDocument> {
  constructor() {
    super(Project); // Pass the Project model to the BaseService
  }
}

export const projectService = new ProjectService();
