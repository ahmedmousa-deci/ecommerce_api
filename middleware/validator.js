import { validationResult } from "express-validator";
import AppError from "../utils/appError.js";

const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return next(
    new AppError(
      400,
      errors
        .array()
        .map((err) => err.msg)
        .join(", "),
    ),
  );
};

export default validator;
