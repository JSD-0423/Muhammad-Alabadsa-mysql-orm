import { Router } from "express";
import passport from "passport";

import { UsersControllers } from "../controllers/index.js";
import {
  validateUserId,
  validateCreateUserBody,
  validateSigninBody,
} from "../middlewares/validation/userValidation.js";
import { IUsersRoute } from "./types";

class UsersRoute implements IUsersRoute {
  path = "/";
  router = Router();
  userControllers;

  constructor(userControllers: UsersControllers) {
    this.userControllers = userControllers;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      `${this.path}signin`,
      validateSigninBody,
      // passport.authenticate("jwt", { session: false }),
      this.userControllers.signin
    );
    this.router.get(
      `${this.path}`,
      passport.authenticate("jwt", {
        // successRedirect: "/",
        // failureRedirect: "/signin",
        session: false,
      }),
      this.userControllers.getAllUsers
    );
    this.router.post(
      `${this.path}signup`,
      validateCreateUserBody,
      this.userControllers.signup
    );
  }
}

export default UsersRoute;

