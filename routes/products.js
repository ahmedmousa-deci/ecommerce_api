const express = require("express");

const router = express.Router();

// responde with all products
router.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "ok",
  });
});

//responde with a certain product
router.get("/:id", (req, res) => {
  res.json({
    status: 200,
    message: "ok",
  });
});

//add a product
router.post("/", (req, res) => {
  res.json({
    status: 200,
    message: "ok",
  });
});

// edit product
router.put("/:id", (req, res) => {
  res.json({
    status: 200,
    message: "ok",
  });
});

module.exports = router;
