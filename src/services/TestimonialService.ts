import BaseService from "./BaseService";
import { ITestimonialDocument } from "../interfaces";
import Testimonial from "../models/testimonialModel";

export default class TestimonialService extends BaseService<ITestimonialDocument> {
  constructor() {
    super(Testimonial);
  }
}

export const testimonialService = new TestimonialService();
