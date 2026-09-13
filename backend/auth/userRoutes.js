import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserProfile,
} from "../service/userService.js";
import { protect, admin } from "./authMiddleware.js";

const router = express.Router();

// User profile route
router.route("/profile").put(protect, updateUserProfile);

// All routes here are protected and require admin role
router.route("/").get(protect, admin, getUsers);
router
  .route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

export default router;
