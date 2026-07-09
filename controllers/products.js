import productsModule from "../modules/products.js";
import aHandler from "../utils/asyncHandler.js";
import AppError from "../utils/appError.js";

export const getProducts = aHandler(async (req, res, next) => {
  const products = await productsModule.find({}).populate("category");
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
  const product = await productsModule
    .create({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      images: req.body.images,
    })
    .populate("category");
  res.status(201);
  res.json({
    status: 201,
    message: "Created successfully",
    data: product,
  });
});

export const updateProduct = aHandler(async (req, res, next) => {
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
