import productsModule from "../modules/products.js";
import categoryModule from "../modules/category.js";
import aHandler from "../utils/asyncHandler.js";
import AppError from "../utils/appError.js";
import mongoose from "mongoose";

export const getProducts = aHandler(async (req, res, next) => {
  const { name, minPrice, maxPrice, inStock, category } = req.query;
  let query = {};

  if (name) query.name = { $regex: name, $options: "i" };

  if (minPrice || maxPrice) query.price = {};
  if (minPrice) query.price.$gte = Number(minPrice);
  if (maxPrice) query.price.$lte = Number(maxPrice);

  if (inStock === "true") query.inStock = true;
  if (inStock === "false") query.inStock = false;

  if (category) {
    const isValidCategoryId = await mongoose.Types.ObjectId.isValid(category);
    if (!isValidCategoryId) {
      const categoryDoc = await categoryModule.findOne({ slug: category });
      if (categoryDoc) {
        query.category = categoryDoc._id;
      }
      else {
        throw new AppError(404, "Couldn't find a category with this slug");
      }
    } else if (isValidCategoryId && (await categoryModule.exists({ _id: category }))) {
      query.category = category;
    } else {
      throw new AppError(404, "Couldn't find a category with this id");
    }
  };

  const products = await productsModule.find(query).populate("category");

  res.json({
    status: 200,
    message: "All products has been fetched successfully",
    data: products,
  });
});

export const getProduct = aHandler(async (req, res, next) => {
  const product = await productsModule
    .findById(req.params.id)
    .orFail(new AppError(404, "Couldn't find a product with this id"))
    .populate("category");
  res.json({
    status: 200,
    message: "Product found",
    data: product,
  });
});

export const addProduct = aHandler(async (req, res, next) => {
  if ((await categoryModule.exists({ _id: req.body.category })) === null) {
    throw new AppError(404, "couldn't find the category");
  }

  const product = await productsModule.create({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    images: req.body.images,
  });
  res.status(201);
  res.json({
    status: 201,
    message: "Created successfully",
    data: product,
  });
});

export const updateProduct = aHandler(async (req, res, next) => {
  if (
    req.body.category &&
    (await categoryModule.exists({ _id: req.body.category })) === null
  ) {
    throw new AppError(404, "couldn't find the category");
  }

  const updatedProduct = await productsModule
    .findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    })
    .orFail(new AppError(404, "Couldn't find a product with this id"))
    .populate("category");
  res.json({
    code: 200,
    message: "Updated successfully",
    data: updatedProduct,
  });
});

export const deleteProduct = aHandler(async (req, res, next) => {
  await productsModule
    .findByIdAndDelete(req.params.id)
    .orFail(new AppError(404, "Couldn't find a product with this id"));
  res.status(204).send();
});
