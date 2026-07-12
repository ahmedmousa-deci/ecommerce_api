import ordersModule from "../modules/orders.js";
import cartsModule from "../modules/carts.js";
import productsModule from "../modules/products.js";
import aHandler from "../utils/asyncHandler.js";
import AppError from "../utils/appError.js";
import inStock from "../utils/inStock.js";
import validatePIds from "../utils/validateProductsIds.js";
import mongoose from "mongoose";
import calculateTotal from "../utils/calculateTotal.js";

export const getOrders = aHandler(async (req, res, next) => {
  const orders = await ordersModule.find().populate("items.productId");

  res.status(200).json({
    status: 200,
    message: "All orders fetched successfully",
    data: orders,
  });
});

export const getOrder = aHandler(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    throw new AppError(400, "invalid cart id");

  const order = await ordersModuleModule
    .findById(req.params.id)
    .orFail(new AppError(404, "Couldn't find any order with this id"))
    .populate("items.productId");

  await order.populate("items.productId");

  res.status(200).json({
    status: 200,
    message: "Successfully found order",
    data: order,
  });
});

export const addOrder = aHandler(async (req, res, next) => {
  const { cartId, shippingAddress, status } = req.body;

  const cart = await cartsModule
    .findById(cartId)
    .orFail(new AppError(400, "Invalid cart id"))
    .populate("items.productId");

  const inS = await inStock(
    cart.items.map((v) => {
      return { id: v.id, quantity: v.quantity };
    }),
  );

  if (inS === "oos") {
    res.status(409).json({
      status: 409,
      message: "out of stock",
      data: null,
    });
    return;
  } else if (inS === "los") {
    res.status(409).json({
      status: 409,
      message: "low on stock",
      data: null,
    });
    return;
  }

  for (const i of cart.items) {
    await productsModule.findByIdAndUpdate(
      i.productId,
      {
        stock: i.productId.stock - i.quantity,
      },
      {
        runValidators: true,
      },
    );
  }

  const items = cart.items.map((v) => {
    return {
      productId: v.productId._id || v.productId,
      quantity: v.quantity,
    };
  });

  const order = await ordersModule.create({
    items: items,
    totalPrice: cart.totalPrice,
    status,
    shippingAddress,
  });

  await cart.deleteOne();

  res.status(201).json({
    status: 201,
    message: "added order successfully",
    data: order,
  });
});

export const updateOrder = aHandler(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    throw new AppError(400, "Invalid order id");

  const order = await ordersModule
    .findById(req.params.id)
    .orFail(new AppError(404, "Couldn't find any order with this id"));

  if (req.body.items !== undefined) {
    if (!Array.isArray(req.body.items)) {
      throw new AppError(400, "Items must be an array");
    }

    const ids = req.body.items.map((v) => v.productId);
    validatePIds(ids);

    const productsData = req.body.items.map((v) => {
      return { id: v.productId, quantity: v.quantity };
    });

    req.body.totalPrice = await calculateTotal(productsData);
  }

  const updatedOrder = await ordersModule
    .findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    })
    .populate("items.productId");

  res.status(200).json({
    status: 200,
    message: "Order updated successfully",
    data: updatedOrder,
  });
});

export const deleteOrder = aHandler(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    throw new AppError(400, "Invalid order id");

  const order = await ordersModule
    .findById(req.params.id)
    .orFail(new AppError(404, "Couldn't find any order with this id"));

  for (const item of order.items) {
    await productsModule.findByIdAndUpdate(
      item.productId,
      {
        $inc: { stock: item.quantity },
      },
      {
        runValidators: true,
      },
    );
  }

  await order.deleteOne();

  res.status(209).send();
});
