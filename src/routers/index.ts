import { Router } from "express";

import {
  BooksControllers,
  RentControllers,
  UsersControllers,
} from "../controllers/index.js";
import {
  UsersServices,
  RentServices,
  BooksServices,
} from "../services/index.js";
import BooksRoute from "./books.route.js";
import UsersRoute from "./users.route.js";
import RentRoute from "./rent.route.js";

const router = Router();
const bookServices = new BooksServices();
const rentServices = new RentServices();
const userServices = new UsersServices();

const bookControllers = new BooksControllers(bookServices);
const rentControllers = new RentControllers(rentServices);
const userControllers = new UsersControllers(userServices);

const usersRoute = new UsersRoute(userControllers).router;
const booksRoute = new BooksRoute(bookControllers).router;
const rentRoute = new RentRoute(rentControllers).router;

router.use("/users", usersRoute);
router.use("/books", booksRoute);
router.use("/rents", rentRoute);

export default router;

