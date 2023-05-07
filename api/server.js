import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.route.js";
import gigRouter from "./routes/gig.route.js";
import conversationRouter from "./routes/conversation.route.js";
import messageRouter from "./routes/message.route.js";
import reviewRouter from "./routes/review.route.js";
import orderRouter from "./routes/order.route.js";
import authRouter from "./routes/auth.route.js";
import wheelRouter from "./routes/wheel.route.js";

const app = express();
const port = 3000;
dotenv.config();

mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connect to mongoDB");
  } catch (error) {
    console.log(error);
  }
};

//middleware
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/messages", messageRouter);
app.use("/api/conversations", conversationRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/orders", orderRouter);
app.use("/api/wheel", wheelRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong ....";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(port, () => {
  connect();
  console.log(` app listening on port ${port}`);
});
