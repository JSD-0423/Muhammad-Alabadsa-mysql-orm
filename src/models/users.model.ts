import {
  Model,
  Column,
  DataType,
  Table,
  BeforeCreate,
  BelongsToMany,
} from "sequelize-typescript";
import { Book } from "./books.model.js";
import { Rent } from "./rent.model.js";
import { hashPassword } from "../utils/hashPassword.js";

@Table({
  timestamps: false,
  tableName: "users",
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @BelongsToMany(() => Book, () => Rent)
  books!: Book[];

  @BeforeCreate
  static hashPassword(user: User) {
    const hash = hashPassword(user.password);
    user.password = hash;
  }
}

