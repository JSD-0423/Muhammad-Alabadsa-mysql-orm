import { Router } from "express";

export interface IBooksRoute {
  path: string;
  router: Router;
  bookControllers: BookController;
  initializeRoutes: () => void;
}

