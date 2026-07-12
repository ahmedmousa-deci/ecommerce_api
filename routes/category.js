import express from "express";
import { body } from "express-validator";
import validator from "../middleware/validator.js";
import {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.js";

const router = express.Router();

router.get("/", getCategories);

router.get("/:id", getCategory);

router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("name is required"),
    body("slug").trim().notEmpty().withMessage("slug is required"),
  ],
  validator,
  addCategory,
);

router.patch("/:id", updateCategory);

router.delete("/:id", deleteCategory);

export default router;
