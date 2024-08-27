import { Document, Schema, model } from "mongoose";

export interface IProject {
  title: string;
  description: string;
  techStack?: string[];
  liveLink?: string;
  codeLink?: string;
  subTitle: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProjectDocument extends IProject, Document {}

export interface ITestimonial {
  name: string;
  imageUrl?: string;
  position: string;
  feedback: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITestimonialDocument extends ITestimonial, Document {}

export interface IContact {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContactDocument extends IContact, Document {}
