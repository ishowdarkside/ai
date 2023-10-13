const express = require("express");
const router = express.Router();
const path = require("path");
const { generateImageEdit } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "aiController"
));

router.post("/generateImageEdit", generateImageEdit);

module.exports = router;
