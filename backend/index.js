import express from "express";
const app = express();
import dotenv from "dotenv";
import connectDB from "./Config/Db.js";
import fileUpload from "express-fileupload";
dotenv.config();
import cors from "cors";
import category from "./Router/Category.js";
import user from "./Router/User.js";
import job from "./Router/Job.js";
import application from "./Router/Application.js";
//=====================Moongose Connection====================//
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
//======================ROUTES=======================//
app.use("/api/category", category);
app.use("/api/user", user);
app.use("/api/job", job);
app.use("/api/application", application);

//=====================Error Handling Middleware========================//
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

//====================PORT========================//
const PORT = process.env.PORT || 7000;

app.listen(PORT, async () => {
  console.log(`server is running on port ${PORT}`);
});
