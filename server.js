import express from "express";
import posts from "./routes/posts.js";
import path from "path";
const port = 5000;

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// setup static folder
// app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use("/api/posts", posts);

app.listen(5000, () => console.log(`Server is running on port ${port}.`));
