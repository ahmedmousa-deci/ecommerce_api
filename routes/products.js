import express from "express";
import {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.js";

const router = express.Router();

// respond with all products
router.get("/", getProducts);

//respond with a certain product
router.get("/:id", getProduct);

//add a product
router.post("/", addProduct);

// edit product
router.patch("/:id", updateProduct);

// delete product
router.delete("/:id", deleteProduct);

export default router;
