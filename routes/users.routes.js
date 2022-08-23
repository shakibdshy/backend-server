import express from "express";
import { deleteUser, getAllUser, getUser, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// Get all User
router.get("/", getAllUser)

// Get a User
router.get("/find/:id", getUser)

// Update User
router.put("/:id", verifyToken, updateUser)

// Delete User
router.delete("/:id", verifyToken, deleteUser)

export default router;