import express from "express";
import { body } from "express-validator";
import validator from "../middleware/validator.js";
import {
  addOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
} from "../controllers/orders.js";

const router = express.Router();

router.get("/", getOrders);

router.get("/:id", getOrder);

router.post(
  "/",
  [
    body("cartId").trim().notEmpty().withMessage("cardId is required"),
    body("shippingAddress")
      .trim()
      .notEmpty()
      .withMessage("shipping Address is required"),
    body("status")
      .optional()
      .isIn(["pending", "processing", "shipped", "delivered", "cancelled"])
      .withMessage("Invalid status"),
  ],
  validator,
  addOrder,
);

router.patch("/:id", updateOrder);

router.delete("/:id", deleteOrder);

export default router;
