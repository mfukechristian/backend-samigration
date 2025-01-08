import express from "express";
import { getVisaAdvice } from "../controllers/visaController.js";

const router = express.Router();

// POST route to handle visa advice requests
router.post("/visa-advice", getVisaAdvice);

export default router;
