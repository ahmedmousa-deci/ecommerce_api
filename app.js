import express from "express";
import config from "./config.js";

import connectDB from "./db/index.js";
import cartsRouter from "./routes/carts.js";
import ordersRouter from "./routes/orders.js";
import productsRouter from "./routes/products.js";
import categoryRouter from "./routes/category.js";
import errHandler from "./middleware/errHandler.js";
// import mongoSanitize from "express-mongo-sanitize";
import { sanitize } from "mongo-sanitizer"; // using mongo-sanitizer instead of express-mongo-sanitize because it use outdated version of express (4 or below)

const app = express();

console.log(config.node_env);

await connectDB(config.db_url);

// server middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  const sanitizeInPlace = (target) => {
    if (!target || typeof target !== "object") return;

    const clone = JSON.parse(JSON.stringify(target));

    const cleaned = sanitize(clone);

    Object.keys(target).forEach((key) => {
      delete target[key];
    });

    Object.assign(target, cleaned);
  };

  sanitizeInPlace(req.body);
  sanitizeInPlace(req.query);
  sanitizeInPlace(req.params);

  next();
});

// server routes
app.get("/", (req, res) => {
  res.status(200);
  res.json({
    status: 200,
    message: "server is running perfectly",
  });
});
app.use("/carts", cartsRouter);
app.use("/orders", ordersRouter);
app.use("/products", productsRouter);
app.use("/category", categoryRouter);
// not found middleware
app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    message: `Cannot find ${req.originalUrl}`,
    data: null,
  });
});

// central error handler
app.use(errHandler);

// running the apps
app.listen(config.port, () => {
  console.log(`the app is running at http://localhost:${config.port}/`);
});
