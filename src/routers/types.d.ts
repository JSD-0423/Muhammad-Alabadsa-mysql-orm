import { Router } from "express";

export interface IBooksRoute {
  path: string;
  router: Router;
  bookControllers: BookController;
  initializeRoutes: () => void;
}

export interface IUsersRoute {
  path: string;
  router: Router;
  userControllers: UserController;
  initializeRoutes: () => void;
}

