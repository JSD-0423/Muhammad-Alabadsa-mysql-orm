import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { validationResult, Result } from "express-validator";
import jwt from "jsonwebtoken";

import { UsersServices } from "../services/index";
import { User } from "../models/users.model.js";
import { ApiError } from "../utils/apiError.js";
import { IResData } from "./types";
import { compare } from "../utils/hashPassword.js";
import { JWT_SECRET_KEY } from "../config/index.js";

export class UsersControllers {
  usersService;

  constructor(usersService: UsersServices) {
    this.usersService = usersService;
  }

  getAllUsers = async (
    req: Request,
    res: Response<IResData>,
    next: NextFunction
  ): Promise<any> => {
    try {
      const users = await this.usersService.findAllUsers();

      res.status(httpStatus.OK).json({
        status: httpStatus["200"],
        message: "Get All Users!",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  };

  signin = async (
    req: Request,
    res: Response<IResData>,
    next: NextFunction
  ): Promise<any> => {
    const { email, password } = req.body;
    console.log({ email, password });
    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user || !compare(password, user.password ?? "")) {
        return res.status(400).json({
          status: httpStatus["400"],
          message: "email or password is wrong",
        });
      }

      const payload = { id: user.id };

      console.log({ JWT_SECRET_KEY });

      const token = jwt.sign(payload, JWT_SECRET_KEY as string);

      res.cookie("token", token, { httpOnly: true });
      return res.status(httpStatus.OK).json({
        status: httpStatus["200"],
        message: "You logged in suucessfully",
        token,
        // data: { email: user.email, username: user.username },
      });
    } catch (error) {
      next(error);
    }
  };

  signup = async (
    req: Request,
    res: Response<IResData>,
    next: NextFunction
  ): Promise<any> => {
    const userBody = req.body;
    try {
      const result: Result = validationResult(req);
      if (result.array().length > 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, result.array()[0]["msg"]);
      }

      const user = await this.usersService.createNewUser(userBody);

      res.status(httpStatus.OK).json({
        status: httpStatus["200"],
        message: "User added successfully!",
        data: { ...user, password: "" },
      });
    } catch (error) {
      next(error);
    }
  };
}

