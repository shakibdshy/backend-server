import express from "express";
import { getToken } from "../controllers/token.controller.js";

const router = express.Router();

// Get Token
router.post("/", getToken)

export default router;