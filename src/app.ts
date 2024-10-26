import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./router";
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ success: true, message: "Welcome to the Pinpik Server!" });
});

export default app;
