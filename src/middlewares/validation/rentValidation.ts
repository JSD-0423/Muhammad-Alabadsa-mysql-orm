import { param, body } from "express-validator";

export const validateUserId = [
  param("id", "id does not exist").notEmpty(),
  param("id", "Id must be integer").toInt().isInt(),
];

export const validateRentBody = [
  body("userId", "UserID must be integer").toInt().isInt(),
  body("bookId", "BookId must be integer").toInt().isInt(),
];

