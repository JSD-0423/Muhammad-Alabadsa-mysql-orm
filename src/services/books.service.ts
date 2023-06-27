import httpStatus from "http-status";
import { ApiError } from "../utils/apiError.js";
import { __dirname } from "../app.js";
import { IBook } from "../interfaces/book.js";
import { Book } from "../models/books.model.js";

export class BooksServices {
  async findAllBooks({
    page = 0,
    limit = 5,
  }: {
    page: number;
    limit: number;
  }): Promise<Book[]> {
    const books: Book[] = await Book.findAll({
      offset: page,
      limit,
    });
    return books;
  }

  async finBookById(bookId: number): Promise<Book> {
    const book: Book | null = await Book.findByPk(bookId);
    if (!book) throw new ApiError(httpStatus.NOT_FOUND, "Book doesn't exist");
    return book;
  }

  async createNewBook(book: Record<string, any>): Promise<Book> {
    const existBook: Book | null = await Book.findOne({
      where: { isbn: book.isbn },
    });
    if (existBook)
      throw new ApiError(
        httpStatus.FORBIDDEN,
        `Book with isbn ${book.isbn} is already existed`
      );
    const createdBook: Book = await Book.create(book);
    return createdBook;
  }

  async updateBook(bookId: number, book: IBook): Promise<Book> {
    const existBook: Book | null = await Book.findByPk(bookId);
    if (!existBook)
      throw new ApiError(httpStatus.NOT_FOUND, "Book doesn't exist");
    await Book.update(book, { where: { id: bookId } });

    const updatedBook = (await Book.findByPk(bookId)) as Book;
    return updatedBook;
  }

  async deleteBook(bookId: number): Promise<Book | null> {
    const existBook: Book | null = await Book.findByPk(bookId);
    if (!existBook) throw new ApiError(409, "User doesn't exist");
    Book.destroy({ where: { id: bookId } });
    return existBook;
  }
}

