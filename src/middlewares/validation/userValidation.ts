import { param, body } from "express-validator";

export const validateUserId = [
  param("id", "id does not exist").notEmpty(),
  param("id", "Id must be integer").isInt(),
];

export const validateSigninBody = [
  body("username", "Username must be string")
    .isString()
    .isLength({ min: 6, max: 30 }),
  body("password", "Password Must be at least 6 characters")
    .notEmpty()
    .isString()
    .trim(),
];

export const validateCreateUserBody = [
  body("username", "Username must not be empty")
    .notEmpty()
    .isString()
    .isLength({ min: 6, max: 30 }),
  body("email", "Email must not be empty")
    .notEmpty()
    .isEmail()
    .withMessage("Email must be email"),
  body("password", "Password must not be empty")
    .notEmpty()
    .isString()
    .isLength({ min: 6, max: 150 })
    .isAlphanumeric()
    .withMessage("Password must contain letter and numbers"),
];

