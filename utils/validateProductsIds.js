import mongoose from "mongoose";
import productsModule from "../modules/products.js";
import AppError from "./appError.js";

async function validatePIds(ids) {
  if (new Set(ids).size !== ids.length) {
    throw new AppError(400, "Duplicated items");
    return false;
  }

  for (let id of ids) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log(id, ids, !mongoose.Types.ObjectId.isValid(id));
      throw new AppError(400, "Invalid product ID");
      return false;
    }
  }

  const products = await productsModule
    .find({ _id: { $in: ids } })
    .select("_id");

  if (products.length < ids.length) {
    throw new AppError(404, "Some products is not found");
    return false;
  }

  return true;
}

export default validatePIds;
