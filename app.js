import dotenv from "dotenv";
dotenv.config();
import express from "express";
import config from "./config/config.js";

import connectDB from "./db/index.js";
import cartsRouter from "./routes/carts.js";
import ordersRouter from "./routes/orders.js";
import productsRouter from "./routes/products.js";
import categoryRouter from "./routes/category.js";
import errHandler from "./middleware/errHandler.js";
import mongoSanitize from "express-mongo-sanitize";

const app = express();

console.log(config.node_env);

await connectDB(config.db_url);

// server middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => { // to avoid the error of "Cannot assign to read only property 'query' of object '#<Object>'" when using express-mongo-sanitize
  Object.defineProperty(req, 'query', {
    value: { ...req.query },
    writable: true,
    configurable: true,
    enumerable: true,
  });
  next();
});
app.use(mongoSanitize())

// server routes
app.get("/api", (req, res) => {
  res.status(200);
  res.json({
    status: 200,
    message: "server is running perfectly",
  });
});
app.use("/api/carts", cartsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoryRouter);
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
