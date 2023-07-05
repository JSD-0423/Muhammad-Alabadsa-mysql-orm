import {
  Model,
  Column,
  DataType,
  Table,
  BelongsToMany,
} from "sequelize-typescript";
import { Rent } from "./rent.model.js";
import { User } from "./users.model.js";

@Table({
  timestamps: false,
  tableName: "books",
})
export class Book extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  isbn!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  title!: string;
  
  @Column({
    type: DataType.STRING,
  })
  subtitle!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  author!: string;

  @Column({
    type: DataType.DATE,
  })
  published!: Date;

  @BelongsToMany(() => User, () => Rent)
  users!: User[];
}

