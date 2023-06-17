import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { fileURLToPath } from "url";
import httpStatus from "http-status";

import { ApiError } from "./utils/apiError.js";
import bookRoutes from "./routers/index.js";
import { DB } from "./databases/index.js";

interface IResData {
  code: number;
  message: string;
}

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "pug");
app.set("views", path.resolve("./src/views"));
// v1 api routes
app.use("/api/v1", bookRoutes);

DB.sequelize.sync({ alter: true });

// send back a 404 error for any unknown api request
app.use((_req: Request, _res: Response<IResData>, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(
  (err: any, _req: Request, res: Response<IResData>, _next: NextFunction) => {
    let { statusCode, message } = err;
    statusCode = statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    message = message || httpStatus[httpStatus.INTERNAL_SERVER_ERROR];

    const response = {
      code: statusCode,
      message,
    };

    res.status(statusCode).send(response);
  }
);

export default app;

