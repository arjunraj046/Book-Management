import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import connectDB from "./src/DataBase/connectionDB";
import BookRoute from "./src/Router/bookRouter";

dotenv.config();
const app: Express = express();
const port = process.env.PORT;
connectDB();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/api", BookRoute());

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
