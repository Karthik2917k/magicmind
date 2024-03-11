import express, { Request, Response } from "express";
import dbConnection from "./src/config/db.config";
import routes from "./src/routes/routes";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use("/", routes);

app.listen(PORT, async () => {
  try {
    await dbConnection();
    console.log(`Server is running on port ${PORT}`);
  } catch (e) {
    console.log("Error: While listening the PORT");
  }
});
