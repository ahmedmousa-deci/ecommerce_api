import express from "express";
import config from "./config.js";

import connectDB from "./db/index.js";
import cartsRouter from "./routes/carts.js";
import ordersRouter from "./routes/orders.js";
import productsRouter from "./routes/products.js";
import categoryRouter from "./routes/category.js";
import errHandler from "./middleware/errHandler.js";

const app = express();

await connectDB(config.db_url);

// server middleware
app.use(express.json());

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

// central error handler
app.use(errHandler);

// running the apps
app.listen(config.port, () => {
  console.log(`the app is running at http://localhost:${config.port}/`);
});
