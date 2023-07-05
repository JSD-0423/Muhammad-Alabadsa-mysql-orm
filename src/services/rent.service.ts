import httpStatus from "http-status";
import { ApiError } from "../utils/apiError.js";
import { __dirname } from "../app.js";
import { Rent } from "../models/rent.model.js";

export class RentServices {
  async findAllRentedBooks({
    page = 0,
    limit = 5,
  }: {
    page: number;
    limit: number;
  }): Promise<Rent[]> {
    const rentedBooks: Rent[] = await Rent.findAll({
      offset: page,
      limit,
    });
    return rentedBooks;
  }

  async findAllUserRentedBooks({
    userId,
  }: {
    userId: number;
  }): Promise<Rent[]> {
    const rentedBooks: Rent[] = await Rent.findAll({
      where: {
        userId,
      },
    });
    return rentedBooks;
  }

  async addRent({
    userId,
    bookId,
  }: {
    userId: number;
    bookId: number;
  }): Promise<Rent> {
    const rentBook: Rent = await Rent.create({
      userId,
      bookId,
    });
    return rentBook;
  }
}

