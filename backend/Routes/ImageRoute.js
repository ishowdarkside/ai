const express = require("express");
const router = express.Router();
const path = require("path");
const { saveImage, getSavedImages } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "imageController"
));

router.post("/save-image", saveImage);
router.get("/savedImages", getSavedImages);

module.exports = router;
