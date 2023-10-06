const express = require("express");
const router = express.Router();
const path = require("path");
const { createFolder, deleteFolder, getAllFolders, updateFolder } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "folderController"
));
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
router.post("/create", upload.array("photos", 10), createFolder);
router.patch("/:folderId", upload.array("photos", 10), updateFolder);
router.delete("/:folderId", deleteFolder)
router.get("/", getAllFolders);
module.exports = router;
