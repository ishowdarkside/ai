const express = require("express");
const router = express.Router();
const path = require("path");
const { saveImage, getSavedImages, resizeProduct } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "imageController"
));

router.post("/save-image", saveImage);
router.get("/savedImages", getSavedImages);
router.post("/resizeProduct", resizeProduct);

module.exports = router;
