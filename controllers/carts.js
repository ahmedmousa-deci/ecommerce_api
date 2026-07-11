import cartModule from "../modules/carts.js";
import aHandler from "../utils/asyncHandler.js";
import AppError from "../utils/appError.js";
import calculateTotal from "../utils/calculateTotal.js";
import validatePIds from "../utils/validateProductsIds.js";
import inStock from "../utils/inStock.js";
import mongoose from "mongoose";

export const getCarts = aHandler(async (req, res, next) => {
  const carts = await cartModule.find().populate("items.productId");

  res.status(200).json({
    status: 200,
    message: "All carts fetched successfully",
    data: carts,
  });
});

export const getCart = aHandler(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    throw new AppError(400, "invalid cart id");

  const cart = await cartModule
    .findById(req.params.id)
    .orFail(new AppError(404, "Couldn't find any cart with this id"))
    .populate("items.productId");

  res.status(200).json({
    status: 200,
    message: "Successfully found cart",
    data: cart,
  });
});
export const addCart = aHandler(async (req, res, next) => {
  const productsData = req.body.items.map((v) => {
    return { id: v.productId, quantity: v.quantity };
  });

  const ids = req.body.items.map((v) => v.productId);

  await validatePIds(ids);

  const inS = await inStock(productsData);

  if (inS === "oos") {
    res.status(409).json({
      status: 409,
      message: "out of stock",
      data: null,
    });
  } else if (inS === "los") {
    res.status(409).json({
      status: 409,
      message: "low on stock",
      data: null,
    });
  }

  const cart = await cartModule.create({
    items: req.body.items,
    totalPrice: await calculateTotal(productsData),
  });

  res.status(201).json({
    status: 201,
    message: "cart created successfully",
    data: cart,
  });
});

export const addItems = aHandler(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    throw new AppError(400, "invalid cart id");

  await validatePIds([req.body.productId]);

  const cart = await cartModule
    .findById(req.params.id)
    .orFail(new AppError(404, "Couldn't find any cart with this id"));

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === req.body.productId,
  );

  const newQuantity =
    (itemIndex > -1 ? cart.items[itemIndex].quantity : 0) + req.body.quantity;
  if (itemIndex > -1) {
    console.log(newQuantity, newQuantity < 0, -1 < 0);
    if (newQuantity < 0) {
      return res.status(400).json({
        message: "quantity cannot drop below zero.",
      });
    } else if (newQuantity === 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = newQuantity;
    }
  }

  const inS = await inStock([
    {
      id: req.body.productId,
      quantity:
        itemIndex > -1 && newQuantity > 0
          ? cart.items[itemIndex].quantity
          : req.body.quantity,
    },
  ]);

  if (inS === "oos") {
    res.status(409).json({
      status: 409,
      message: "out of stock",
      data: null,
    });
  } else if (inS === "los") {
    res.status(409).json({
      status: 409,
      message: "low on stock",
      data: null,
    });
  }

  if (!(itemIndex > -1) && req.body.quantity > 0)
    cart.items.push({
      productId: req.body.productId,
      quantity: req.body.quantity,
    });
  await cart.save();
  res.status(201).json({
    status: 201,
    message: "added item successfully",
    data: cart,
  });
});

export const updateCart = aHandler(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    throw new AppError(400, "invalid cart id");

  const productsData = req.body.items.map((v) => {
    return { id: v.productId, quantity: v.quantity };
  });

  const ids = req.body.items.map((v) => v.productId);

  await validatePIds(ids);

  const inS = await inStock(productsData);

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

  const cart = await cartModule
    .findByIdAndUpdate(
      req.params.id,
      {
        items: req.body.items,
        totalPrice: await calculateTotal(productsData),
      },
      { runValidators: true, returnDocument: "after" },
    )
    .orFail(new AppError(404, "Couldn't find any cart with this id"))
    .populate("items.productId");

  res.status(200).json({
    status: 200,
    message: "cart updated successfully",
    data: cart,
  });
});

export const deleteCart = aHandler(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    throw new AppError(400, "invalid cart id");

  await cartModule
    .findByIdAndDelete(req.params.id)
    .orFail(new AppError(404, "Couldn't find any cart with this id"));

  res.status(204).send();
});

export const clearCart = aHandler(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    throw new AppError(400, "invalid cart id");

  const cart = await cartModule
    .findByIdAndUpdate(
      req.params.id,
      {
        items: [],
        totalPrice: 0,
      },
      {
        returnDocument: "after",
      },
    )
    .orFail(new AppError(404, "Couldn't find any cart with this id"));

  res.status(200).json({
    status: 200,
    message: "cart cleared",
    data: cart,
  });
});
