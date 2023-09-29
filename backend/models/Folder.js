const mongoose = require("mongoose");

const FolderSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  images: {
    type: [String],
    default: [],
  },
});

const Folder = mongoose.model("Folder", FolderSchema);

module.exports = Folder;
