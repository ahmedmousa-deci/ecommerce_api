import express from "express";
import { body } from "express-validator";
import validator from "../middleware/validator.js";
import {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProduct);

router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("name is Required"),
    body("category").trim().notEmpty().withMessage("category is required"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("description is required"),
    body("price").trim().notEmpty().withMessage("price is required"),
    body("stock").trim().notEmpty().withMessage("stock is required"),
  ],
  validator,
  addProduct,
);

router.patch("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
