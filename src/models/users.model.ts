import { Model, Column, DataType, Table } from "sequelize-typescript";

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
}

