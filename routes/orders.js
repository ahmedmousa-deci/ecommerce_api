const express = require("express");

const router = express.Router();

// respond with all orders
router.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "ok",
  });
});

//respond with a certain order
router.get("/:id", (req, res) => {
  res.json({
    status: 200,
    message: "ok",
  });
});

//add a order
router.post("/", (req, res) => {
  res.json({
    status: 200,
    message: "ok",
  });
});

// edit order
router.put("/:id", (req, res) => {
  res.json({
    status: 200,
    message: "ok",
  });
});

module.exports = router;
