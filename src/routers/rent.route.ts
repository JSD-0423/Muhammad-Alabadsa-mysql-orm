import { Router } from "express";
import passport from "passport";

import { RentControllers } from "../controllers/index.js";
import {
  validateRentBody,
  validateUserId,
} from "../middlewares/validation/rentValidation.js";
import { IRentRoute } from "./types";

class RentRoute implements IRentRoute {
  path = "/";
  router = Router();
  rentControllers;

  constructor(bookControllers: RentControllers) {
    this.rentControllers = bookControllers;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, this.rentControllers.getAllRentBooks);
    this.router.get(
      `${this.path}users/:id`,
      validateUserId,
      this.rentControllers.getAllUserRentBooks
    );
    this.router.post(
      `${this.path}`,
      validateRentBody,
      passport.authenticate("jwt", {
        // successRedirect: "/",
        // failureRedirect: "/signin",
        session: false,
      }),
      this.rentControllers.userRentBook
    );
  }
}

export default RentRoute;

