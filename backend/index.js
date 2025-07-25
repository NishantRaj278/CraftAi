import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/auth.route.js";
import connectDB from "./config/mongoose-connection.js";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("CraftAI API!");
});

app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
