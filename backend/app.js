const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config({ path: "./config.env" });
const app = express();
const folderRoute = require("./Routes/folderRoute");
const imageRoute = require("./Routes/ImageRoute");
const errorMiddleware = require("./controllers/errorController");
const cors = require("cors");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/folders", folderRoute);
app.use("/api/images", imageRoute);
app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "Route not found!",
  });
});

app.use(errorMiddleware);
module.exports = app;
