import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { fileURLToPath } from "url";
import httpStatus from "http-status";
import passport from "passport";
import {
  Strategy as LocalStrategy,
  VerifyFunctionWithRequest,
} from "passport-local";
import { DoneCallback } from "passport";
import session from "express-session";
import FileStore from "session-file-store";

const FileStoreSession = FileStore(session);

import { ApiError } from "./utils/apiError.js";
import router from "./routers/index.js";
import db from "./databases/index.js";
import { User } from "./models/users.model.js";

interface IResData {
  code: number;
  message: string;
}

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    store: new FileStoreSession(),
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (
  user: false | User | null | undefined,
  done: DoneCallback
) {
  done(null, user);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email: any, password: any, done: any) {
      try {
        const user = await User.findOne({
          where: { email: email },
        });
        if (!user) {
          return done(null, false);
        }
        if (user.password !== password) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

app.set("view engine", "pug");
app.set("views", path.resolve("./src/views"));
// v1 api routes
app.use("/api/v1", router);

db.sync({ alter: false });

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

