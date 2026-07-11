import express from "express";
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

router.post("/", addCart);

router.post("/:id/items", addItems);

router.patch("/:id", updateCart);

router.delete("/:id", deleteCart);

router.delete("/:id/clear", clearCart);

export default router;
