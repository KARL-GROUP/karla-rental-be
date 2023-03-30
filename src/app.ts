require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
import config from "config";
import validateEnv from "./utils/validateEnv";
import { AppDataSource } from "./utils/data-source";
import redisClient from "./utils/connectRedis";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import tagRouter from "./routes/tag.routes";
import carRouter from "./routes/car.routes";
import orderRouter from "./routes/order.routes";
import AppError from "./utils/appError";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import { swaggerDoc } from "./docs/swagger";

AppDataSource.initialize()
  .then(async () => {
    // VALIDATE ENV
    validateEnv();

    const app = express();

    // MIDDLEWARE

    // 1. Body parser
    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    app.use(bodyParser.json());

    // 2. Logger
    if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

    // 3. Cookie Parser
    app.use(cookieParser());

    // 4. Cors
    app.use(
      cors({
        origin: config.get<string>("origin"),
        credentials: true,
      })
    );


    // 5. Documentation
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

    // ROUTES
    app.use("/api/auth", authRouter);
    app.use("/api/users", userRouter);
    app.use("/api/tags", tagRouter);
    app.use("/api/cars", carRouter);
    app.use("/api/orders", orderRouter);

    // HEALTH CHECKER
    app.get("/api/healthchecker", async (_, res: Response) => {
      const message = await redisClient.get("try");
      res.status(200).json({
        status: "success",
        message,
      });
    });

    app.get("/api/trial", async (req, res: Response) => {
      // const images = req.files;

      res.status(200).json({ message: "working" });
      // return years;
    });

    // UNHANDLED ROUTE
    app.all("*", (req: Request, res: Response, next: NextFunction) => {
      next(new AppError(404, `Route ${req.originalUrl} not found`));
    });

    // GLOBAL ERROR HANDLER
    app.use(
      (error: AppError, req: Request, res: Response, next: NextFunction) => {
        error.status = error.status || "error";
        error.statusCode = error.statusCode || 500;

        res.status(error.statusCode).json({
          status: error.status,
          message: error.message,
        });
      }
    );

    const port = config.get<number>("port");
    app.listen(port);

    console.log(`Server started on port: ${port}`);
  })
  .catch((error) => console.log(error));
