import Sequelize from "sequelize-typescript";
import {
  NODE_ENV,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
} from "../config/index.js";
import { Book } from "../models/books.model.js";
import { User } from "../models/users.model.js";

const connection = new Sequelize.Sequelize({
  database: DB_DATABASE,
  username: DB_USER,
  password: DB_PASSWORD,
  dialect: "mysql",
  host: DB_HOST,
  models: [Book, User],
});

export default connection;

