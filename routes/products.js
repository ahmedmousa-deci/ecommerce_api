const express = require("express");
const {
  addProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

const router = express.Router();

// responde with all products
router.get("/", getProducts);

//responde with a certain product
router.get("/:id", getProduct);

//add a product
router.post("/", addProduct);

// edit product
router.patch("/:id", updateProduct);

// delete product
router.delete("/:id", deleteProduct);

module.exports = router;
