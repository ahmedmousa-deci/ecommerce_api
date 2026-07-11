import productsModule from "../modules/products.js";
import AppError from "./appError.js";

async function inStock(productsData) {
  const ids = productsData.map((v) => v.id);

  const products = await productsModule
    .find({ _id: { $in: ids } })
    .select("inStock stock");

  for (const i in products) {
    if (!products[i].inStock)
      return "oos"; // out of stock
    else if (products[i].stock < productsData[i].quantity)
      return "los"; // low on stock
    else return "is"; // in stock
  }
}

export default inStock;
