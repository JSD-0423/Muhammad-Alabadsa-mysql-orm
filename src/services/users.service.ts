import httpStatus from "http-status";
import { ApiError } from "../utils/apiError.js";
import { __dirname } from "../app.js";
import { User } from "../models/users.model.js";

export class UsersServices {
  async findAllUsers(): Promise<User[]> {
    const users: User[] = await User.findAll();
    return users;
  }

  async findUserByEmail(userEmail: string): Promise<User> {
    const user: User | null = await User.findOne({
      where: { email: userEmail },
    });
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist");
    return user;
  }

  async createNewUser(user: Record<string, string>): Promise<User> {
    const existedUser: User | null = await User.findOne({
      where: { email: user.email },
    });
    if (existedUser)
      throw new ApiError(
        httpStatus.FORBIDDEN,
        `User with email ${user.email} is already existed`
      );
    const createdUser: User = await User.create(user);
    return createdUser;
  }

  async updateUser(userId: number, user: User): Promise<User> {
    const existedUser: User | null = await User.findByPk(userId);
    if (!existedUser)
      throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist");
    await User.update(user, { where: { id: userId } });

    const updatedUser = (await User.findByPk(userId)) as User;
    return updatedUser;
  }

  async deleteUser(userId: number): Promise<User | null> {
    const existedUser: User | null = await User.findByPk(userId);
    if (!existedUser) throw new ApiError(409, "User doesn't exist");
    User.destroy({ where: { id: userId } });
    return existedUser;
  }
}

