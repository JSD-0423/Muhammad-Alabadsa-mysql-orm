import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { validationResult, Result } from "express-validator";

import { RentServices } from "../services/rent.service";
import { ApiError } from "../utils/apiError.js";
import { IResData } from "./types";

export class RentControllers {
  rentService: RentServices;

  constructor(rentService: RentServices) {
    this.rentService = rentService;
  }

  getAllRentBooks = async (
    req: Request,
    res: Response<IResData>,
    next: NextFunction
  ): Promise<any> => {
    const { page, limit } = req.query as { page: string; limit: string };
    try {
      const result: Result = validationResult(req);
      if (result.array().length > 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, result.array()[0]["msg"]);
      }
      const rentedBooks = await this.rentService.findAllRentedBooks({
        page: +page,
        limit: +limit,
      });

      res.status(httpStatus.OK).json({
        status: httpStatus["200"],
        message: "Get All Rented Books!",
        data: rentedBooks,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllUserRentBooks = async (
    req: Request,
    res: Response<IResData>,
    next: NextFunction
  ): Promise<any> => {
    const id = req.query.id as string;
    try {
      const result: Result = validationResult(req);
      if (result.array().length > 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, result.array()[0]["msg"]);
      }
      const userRentedBooks = await this.rentService.findAllUserRentedBooks({
        userId: +id,
      });

      res.status(httpStatus.OK).json({
        status: httpStatus["200"],
        message: "Get All Rented User Rent Books!",
        data: userRentedBooks,
      });
    } catch (error) {
      next(error);
    }
  };

  userRentBook = async (
    req: Request,
    res: Response<IResData>,
    next: NextFunction
  ): Promise<any> => {
    const { userId, bookId } = req.body;
    try {
      const result: Result = validationResult(req);
      if (result.array().length > 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, result.array()[0]["msg"]);
      }
      const bookRent = await this.rentService.addRent({
        userId: +userId,
        bookId: +bookId,
      });

      res.status(httpStatus.OK).json({
        status: httpStatus["200"],
        message: "Book rented Successfully!",
        data: bookRent,
      });
    } catch (error) {
      next(error);
    }
  };
}

