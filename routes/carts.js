import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "ok",
  });
});

router.get("/:id", (req, res) => {
  res.json({
    status: 200,
    message: "ok",
  });
});

router.post("/", (req, res) => {
  res.json({
    status: 200,
    message: "ok",
  });
});

router.patch("/:id", (req, res) => {
  res.json({
    status: 200,
    message: "ok",
  });
});

router.delete("/:id", (req, res) => {
  res.json({
    status: 200,
    message: "ok",
  });
});

export default router;
