const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config({ path: "./config.env" });
const app = express();
const folderRoute = require("./Routes/folderRoute");
const imageRoute = require("./Routes/ImageRoute");
const aiRoute = require("./Routes/aiRoute");
const errorMiddleware = require("./controllers/errorController");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: false, limit: "10mb" }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(morgan("dev"));
app.use(cors());
//app.use(express.json());
app.use(express.static("public"));

app.use("/api/folders", folderRoute);
app.use("/api/images", imageRoute);
app.use("/api/ai", aiRoute);
app.use("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public"));
});

app.use(errorMiddleware);
module.exports = app;
