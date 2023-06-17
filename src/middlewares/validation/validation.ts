import { param, query, body } from "express-validator";

export const validateId = [
  param("id", "id does not exist").notEmpty(),
  param("id", "Id Must be integer").isInt(),
];

export const validateGetBooks = [
  query("page", "Page must be integer").toInt().isInt(),
  query("limit", "Linmit Must be integer").toInt().isInt(),
];

export const validateCreateBookBody = [
  body("isbn", "Isbn must not be empty")
    .notEmpty()
    .toInt()
    .isInt()
    .withMessage("isbn Must be Integer"),
  body("title", "Title must not be empty")
    .notEmpty()
    .isString()
    .withMessage("title Must be string"),
  body("author", "Author must not be empty")
    .notEmpty()
    .isString()
    .withMessage("Author Must be string"),
  body("published", "Published must not be empty").notEmpty(),
];

export const validateUpdateBookBody = [
  body("title", "Title must not be empty")
    .notEmpty()
    .isString()
    .withMessage("title Must be string"),
  body("author", "Author must not be empty")
    .notEmpty()
    .isString()
    .withMessage("Author Must be string"),
  body("published", "Published must not be empty").notEmpty(),
];

