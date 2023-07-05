import {
  Model,
  Column,
  DataType,
  Table,
  ForeignKey,
  PrimaryKey,
} from "sequelize-typescript";
import { Book } from "./books.model.js";
import { User } from "./users.model.js";

@Table({
  timestamps: false,
  tableName: "rents",
})
export class Rent extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @ForeignKey(() => Book)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  bookId!: number;
}

