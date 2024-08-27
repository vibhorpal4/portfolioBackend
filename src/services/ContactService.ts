import BaseService from "./BaseService";
import Contact from "../models/contactModel";
import { IContactDocument } from "../interfaces";

export default class ContactService extends BaseService<IContactDocument> {
  constructor() {
    super(Contact);
  }
}

export const contactService = new ContactService();
