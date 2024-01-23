const express = require("express");
const dotenv = require("dotenv").config({ path: "/.env" });
const dbconnect = require("./dbconnect")
const authRouter = require("./routers/authRouter");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PostsRouter = require("./routers/PostsRouter");
const userRouter = require("./routers/userRouter");
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
});
const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:4000",
    optionsSuccessStatus: 200,
  })
);
//middlewares
app.use(express.json());
app.use(morgan("common"));
app.use("/auth", authRouter);
app.use("/posts", PostsRouter);
app.use("/user", userRouter)
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});
app.use(cookieParser());
 


app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});
const PORT = process.env.PORT || 4001;
dbconnect();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
