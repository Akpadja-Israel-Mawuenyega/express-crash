const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello!</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>About</h2>");
});

app.listen(5000, () => console.log(`Server is running on port 8000.`));
