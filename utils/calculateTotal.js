import mongoose from "mongoose";
import Decimal from "decimal.js";
import productsModule from "../modules/products.js";
import AppError from "./appError.js";

async function calculateTotal(productsData) {
  const ids = productsData.map((v) => v.id);

  const products = await productsModule
    .find({ _id: { $in: ids } })
    .select("price -_id");

  let totalPrice = new Decimal("0");

  for (let i in products) {
    totalPrice = totalPrice.add(
      new Decimal(`${products[i].price}`).times(
        new Decimal(`${productsData[i].quantity}`),
      ),
    );
  }

  return totalPrice.toString();
}

export default calculateTotal;
