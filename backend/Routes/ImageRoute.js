const express = require("express");
const router = express.Router();
const path = require("path");
const {
  saveImage,
  getSavedImages,
  resizeProduct,
  resizeImage,
  deleteImage,
  getProductImages,
} = require(path.join(__dirname, "..", "controllers", "imageController"));
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
router.post("/save-image", saveImage);
router.get("/savedImages", getSavedImages);
router.post("/resizeProduct", upload.single("product"), resizeProduct);
router.post("/resizeImage", resizeImage);
router.delete("/deleteImage/:imageId", deleteImage);
router.get("/getProductImages", getProductImages);
module.exports = router;
