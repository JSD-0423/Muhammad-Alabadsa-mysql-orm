import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { validationResult, Result } from "express-validator";

import { UsersServices } from "../services/index";
import { User } from "../models/users.model.js";
import { ApiError } from "../utils/apiError.js";
import { IResData } from "./types";

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
    const userBody = req.body;
    try {
      res.status(httpStatus.OK).json({
        status: httpStatus["200"],
        message: "You logged in suucessfully",
        data: req.user,
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
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };
}

