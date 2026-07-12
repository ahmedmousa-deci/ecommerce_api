import express from "express";
import { body } from "express-validator";
import validator from "../middleware/validator.js";
import {
  getCarts,
  getCart,
  addCart,
  addItems,
  updateCart,
  deleteCart,
  clearCart,
} from "../controllers/carts.js";

const router = express.Router();

router.get("/", getCarts);

router.get("/:id", getCart);

router.post(
  "/",
  // 1. Added .exists() (or .notEmpty()) before .withMessage()
  [body("items").exists().withMessage("items is required")],
  validator,
  addCart,
);

router.post(
  "/:id/items",
  [
    // 2. Changed isEmpty() to notEmpty(), and moved withMessage() to the end
    body("productId").notEmpty().withMessage("required product id"),

    // 3. Moved exists() before withMessage()
    body("quantity").exists().withMessage("Quantity is required"),
  ],
  validator,
  addItems,
);

router.patch("/:id", updateCart);

router.delete("/:id", deleteCart);

router.delete("/:id/clear", clearCart);

export default router;
