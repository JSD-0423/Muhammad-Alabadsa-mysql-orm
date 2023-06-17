import httpStatus from "http-status";
import { ApiError } from "../utils/apiError.js";
import { __dirname } from "../app.js";
import { IBook } from "../interfaces/book.js";
import { BookModel } from "../models/books.model";
import { DB } from "../databases/index.js";

export class BooksServices {
  books;

  constructor(books: typeof DB.Books) {
    this.books = books;
  }

  async findAllBooks({
    page = 0,
    limit = 5,
  }: {
    page: number;
    limit: number;
  }): Promise<BookModel[]> {
    const books: BookModel[] = await DB.Books.findAll({
      offset: page,
      limit,
    });
    return books;
  }

  async finBookById(bookId: number): Promise<BookModel> {
    const book: BookModel | null = await this.books.findByPk(bookId);
    if (!book) throw new ApiError(httpStatus.NOT_FOUND, "Book doesn't exist");
    return book;
  }

  async createNewBook(book: IBook): Promise<BookModel> {
    const existBook: BookModel | null = await this.books.findOne({
      where: { isbn: book.isbn },
    });
    if (existBook)
      throw new ApiError(
        httpStatus.FORBIDDEN,
        `Book with isbn ${book.isbn} is already existed`
      );
    const createdBook: BookModel = await this.books.create(book);
    return createdBook;
  }

  async updateBook(bookId: number, book: IBook): Promise<BookModel> {
    const existBook: BookModel | null = await this.books.findByPk(bookId);
    if (!existBook)
      throw new ApiError(httpStatus.NOT_FOUND, "Book doesn't exist");
    await this.books.update(book, { where: { id: bookId } });

    const updatedBook = (await this.books.findByPk(bookId)) as BookModel;
    return updatedBook;
  }

  async deleteBook(bookId: number): Promise<BookModel | null> {
    const existBook: BookModel | null = await this.books.findByPk(bookId);
    if (!existBook) throw new ApiError(409, "User doesn't exist");
    this.books.destroy({ where: { id: bookId } });
    return existBook;
  }
}

