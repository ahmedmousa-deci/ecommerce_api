const express = require("express");
const config = require("./config");

const connectDB = require("./db");
const cartsRouter = require("./routes/carts");
const ordersRouter = require("./routes/orders");
const productsRouter = require("./routes/products");
const errHandler = require("./middleware/errHandler");

const app = express();

connectDB(config.db_url);

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

// centeral error handler
app.use(errHandler);

// running the apps
app.listen(config.port, () => {
  console.log(`the app is running at http://localhost:${config.port}/`);
});
