const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config({ path: "./config.env" });
const app = express();
const folderRoute = require("./Routes/folderRoute");
const errorMiddleware = require("./controllers/errorController");

app.use(express.json());
app.use("/api/folder", folderRoute);

app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "Route not found!",
  });
});

app.use(errorMiddleware);
module.exports = app;
