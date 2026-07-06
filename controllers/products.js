const productsModule = require("../modules/products");

async function getProducts(req, res, next) {
  try {
    const products = await productsModule.find({});
    res.json({
      status: 200,
      message: "good for now",
      content: products,
    });
  } catch (error) {
    next(error);
  }
}

async function getProduct(req, res, next) {
  console.log("GET /products/:id");
  try {
    const product = await productsModule.findById(req.params.id).orFail();
    res.json({
      code: 200,
      content: product,
    });
  } catch (error) {
    next(error);
  }
}

async function addProduct(req, res, next) {
  console.log("POST /products");
  console.log(req.body);
  try {
    await productsModule.create({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
    });
    res.status(201);
    res.json({
      code: 201,
      message: "created successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  console.log("patch /products");
  try {
    const updatedProduct = await productsModule
      .findByIdAndUpdate(req.params.id, req.body, {
        returnDocument: "after",
        runValidators: true,
      })
      .orFail();
    res.json({
      code: 200,
      message: "updated",
      content: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  console.log("DELETE /products");
  try {
    await productsModule.findByIdAndDelete(req.params.id).orFail();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
