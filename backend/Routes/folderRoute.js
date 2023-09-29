const express = require("express");
const router = express.Router();
const path = require("path");
const { createFolder } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "folderController"
));
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
router.post("/create", upload.array("photos", 10), createFolder);

module.exports = router;
