import express from "express";
import posts from "./routes/posts.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import path from "path";
const port = 5000;

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

// setup static folder
// app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use("/api/posts", posts);

//Error middleware
app.use(errorHandler);

app.listen(5000, () => console.log(`Server is running on port ${port}.`));
