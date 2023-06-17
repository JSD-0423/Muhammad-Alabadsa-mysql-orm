import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { validationResult, Result } from "express-validator";

import { BooksServices } from "../services";
import { BookModel } from "../models/books.model.js";
import { ApiError } from "../utils/apiError.js";
import { IResData } from "./types";

export class BooksControllers {
  booksService;

  constructor(booksService: BooksServices) {
    this.booksService = booksService;
  }

  getBooks = async (
    req: Request,
    res: Response<IResData>,
    next: NextFunction
  ): Promise<any> => {
    // const page = req.query.page as string;
    // const limit = req.query.limit as string;
    const { page, limit } = req.query as { page: string; limit: string };
    try {
      const result: Result = validationResult(req);
      if (result.array().length > 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, result.array()[0]["msg"]);
      }
      const books = await this.booksService.findAllBooks({
        page: +page,
        limit: +limit,
      });

      res.status(httpStatus.OK).json({
        status: httpStatus["200"],
        message: "Get All Books!",
        data: books,
      });
    } catch (error) {
      next(error);
    }
  };

  getBook = async (
    req: Request,
    res: Response<IResData>,
    next: NextFunction
  ): Promise<any> => {
    const { id } = req.params;
    try {
      const result: Result = validationResult(req);
      if (result.array().length > 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, result.array()[0]["msg"]);
      }

      const book = await this.booksService.finBookById(+id);
      res.status(httpStatus.OK).json({
        status: httpStatus["200"],
        message: `Get Book with Id = ${id}`,
        data: book,
      });
    } catch (error) {
      next(error);
    }
  };

  addNewBook = async (
    req: Request,
    res: Response<IResData>,
    next: NextFunction
  ): Promise<void> => {
    const bookData = req.body;
    try {
      const result: Result = validationResult(req);
      if (result.array().length > 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, result.array()[0]["msg"]);
      }
      const createdBook: BookModel = await this.booksService.createNewBook(
        bookData
      );

      res.status(httpStatus.CREATED).json({
        status: "success",
        message: "Book added successfully!",
        data: createdBook,
      });
    } catch (error) {
      next(error);
    }
  };

  updateBook = async (
    req: Request,
    res: Response<IResData>,
    next: NextFunction
  ): Promise<void> => {
    const bookData = req.body;
    const { id } = req.params;

    try {
      const result: Result = validationResult(req);
      if (result.array().length > 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, result.array()[0]["msg"]);
      }

      const updatedBook: BookModel = await this.booksService.updateBook(
        +id,
        bookData
      );

      res.status(httpStatus.OK).json({
        status: "success",
        message: "Book updated successfully!",
        data: updatedBook,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteBook = async (
    req: Request,
    res: Response<IResData>,
    next: NextFunction
  ): Promise<void> => {
    const id = req.params.id;

    try {
      const result: Result = validationResult(req);
      if (result.array().length > 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, result.array()[0]["msg"]);
      }
      await this.booksService.deleteBook(+id);

      res.status(httpStatus.OK).json({
        status: "success",
        message: "Book deleted successfully!",
      });
    } catch (error) {
      next(error);
    }
  };
}

