import { Router } from "express";

import { BooksControllers, UsersControllers } from "../controllers/index.js";
import { BooksServices } from "../services/index.js";
import { UsersServices } from "../services/index.js";
import BooksRoute from "./books.route.js";
import UsersRoute from "./users.route.js";

const router = Router();
const bookServices = new BooksServices();
const bookControllers = new BooksControllers(bookServices);

const userServices = new UsersServices();
const userControllers = new UsersControllers(userServices);

const usersRoute = new UsersRoute(userControllers).router;
const booksRoute = new BooksRoute(bookControllers).router;

router.use("/users", usersRoute);
router.use("/books", booksRoute);

export default router;

