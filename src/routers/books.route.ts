import { Router } from "express";
import { BooksControllers } from "../controllers/index.js";
import {
  validateCreateBookBody,
  validateId,
} from "../middlewares/validation/validation.js";
import { IBooksRoute } from "./types";

class BooksRoute implements IBooksRoute {
  path = "/";
  router = Router();
  bookControllers;

  constructor(bookControllers: BooksControllers) {
    this.bookControllers = bookControllers;
    this.initializeRoutes();
  }

  initializeRoutes() {
    console.log("controllers");
    this.router.get(`${this.path}`, this.bookControllers.getBooks);
    this.router.get(
      `${this.path}:id`,
      validateId,
      this.bookControllers.getBook
    );
    this.router.post(
      `${this.path}`,
      validateCreateBookBody,
      this.bookControllers.addNewBook
    );
    this.router.patch(
      `${this.path}:id`,
      validateId,
      validateCreateBookBody,
      this.bookControllers.updateBook
    );
    this.router.delete(
      `${this.path}:id`,
      validateId,
      this.bookControllers.deleteBook
    );
  }
}

export default BooksRoute;

