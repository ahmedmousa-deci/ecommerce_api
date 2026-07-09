import mongoose from "mongoose";
import categoryModule from "../modules/category.js";
import aHandler from "../utils/asyncHandler.js";
import AppError from "../utils/appError.js";

export const getCategory = aHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await categoryModule
    .findOne(
      mongoose.isValidObjectId(id) ? { _id: id } : { slug: id }, // searching using either object id or slug
    )
    .orFail(new AppError(404, "Failed to find the Category using this id."));
  res.status(200);
  res.json({
    status: 200,
    message: "Category found",
    data: user,
  });
});

export const getCategories = aHandler(async (req, res, next) => {
  const categories = await categoryModule.find({});
  res.status(200);
  res.json({
    status: 200,
    message: "All categories has been fetched successfully.",
    data: categories,
  });
});

export const addCategory = aHandler(async (req, res, next) => {
  const newCategory = await categoryModule.create({
    name: req.body.name,
    description: req.body.description,
    slug: req.body.slug,
  });

  res.status(201);
  res.json({
    status: 201,
    message: "Created successfully",
    data: newCategory,
  });
});

export const updateCategory = aHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await categoryModule
    .findOneAndUpdate(
      mongoose.isValidObjectId(id) ? { _id: id } : { slug: id }, // searching using either object id or slug
      req.body,
      {
        runValidators: true,
        returnDocument: "after",
      },
    )
    .orFail(new AppError(404, "Failed to find the Category using this id."));

  res.status(200);
  res.json({
    status: 200,
    message: "Updated successfully",
    data: user,
  });
});

export const deleteCategory = aHandler(async (req, res, next) => {
  const { id } = req.params;
  await categoryModule
    .findOneAndDelete(
      mongoose.isValidObjectId(id) ? { _id: id } : { slug: id }, // searching using either object id or slug
      req.body,
      {
        runValidators: true,
        returnDocument: "after",
      },
    )
    .orFail(new AppError(404, "Failed to find the Category using this id."));
  res.status(204).send();
});

// import express from "express";

// const router = express.Router();

// router.get("/" , (req,res) => {
//   res.statusCode
// })
