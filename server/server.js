import express from "express";
import webpush from "web-push";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import cors from "cors";
import tasks from "./routes/tasks.js";
import path from "path";
const port = 5000;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const apiKeys = {
  publicKey:
    "BDaWA7suSh7L68U49m1dtO0deUksIcWLgsYcO5lAltrIObiNOaD3IFpbhXKedmylKXS6MHW8jFSLuOtkerpMcf4",
  privateKey: "4aWKgdC2BewEueSE_NiHHEX1pCziNE-0dssp38u9HmA",
};

webpush.setVapidDetails(
  "mailto:drimmaculate147@gmail.com",
  apiKeys.publicKey,
  apiKeys.privateKey
);

// Body parser middleware
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));

// connect to db
const CONNECTION_URL =
  "mongodb+srv://drimmaculate147:johnwick9@cluster0.tgpoq.mongodb.net/";

mongoose
  .connect(CONNECTION_URL)
  .then(() => console.log("Connected to database!"))
  .catch((err) => console.log(err.message));

// setup static folder
app.use(express.static(path.join(__dirname, "client", "public")));
app.use(cors());

// ROUTES
app.use("/api", tasks);

app.listen(port, () => console.log(`Server is running on port ${port}.`));
