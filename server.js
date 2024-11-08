import express from "express";
import { fileURLToPath } from "url";
import posts from "./routes/posts.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
import path from "path";
const port = 5000;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

// setup static folder
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use("/api/posts", posts);

//Error middleware
app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => console.log(`Server is running on port ${port}.`)); 
