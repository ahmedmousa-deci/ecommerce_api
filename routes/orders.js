import express from "express";
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

router.post("/", addOrder);

router.patch("/:id", updateOrder);

router.delete("/:id", deleteOrder);

export default router;
