const express = require("express");

const router = express.Router();

// responde with all carts
router.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "ok",
  });
});

//responde with a certain cart
router.get("/:id", (req, res) => {
  res.json({
    status: 200,
    message: "ok",
  });
});

//add a cart
router.post("/", (req, res) => {
  res.json({
    status: 200,
    message: "ok",
  });
});

// edit cart
router.put("/:id", (req, res) => {
  res.json({
    status: 200,
    message: "ok",
  });
});

module.exports = router;
