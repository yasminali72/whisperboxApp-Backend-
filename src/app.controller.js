import connectDB from "./DB/connection.js";
import authController from "./modules/auth/auth.controller.js";
import userController from "./modules/user/user.controller.js";
import messageController from "./modules/message/message.controller.js";
import { globalErrorHandling } from "./utils/errors/error.js";

import cors from "cors";

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://whisperbox-app.vercel.app",
];

const bootstrap = (app, express) => {
  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    })
  );

  app.use(express.json());

  app.get("/", (req, res, next) => {
    return res.status(200).json({
      message: "Welcome in node.js project powered by express and ES6",
    });
  });
  app.use("/auth", authController);
  app.use("/user", userController);
  app.use("/message", messageController);
  app.all("*", (req, res, next) => {
    return res.status(404).json({ message: "In-valid routing" });
  });

  app.use(globalErrorHandling);

  connectDB();
};

export default bootstrap;
