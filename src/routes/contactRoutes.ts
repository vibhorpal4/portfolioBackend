import express from "express";
import { createContact, getAllContacts, getContactId } from "../controllers";

const router = express.Router();

router.post("/", createContact);
router.get("/", getAllContacts);
router.get("/:id", getContactId);

export default router;
