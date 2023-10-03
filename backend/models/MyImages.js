const mongoose = require("mongoose");
const MyImagesSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, "please provide image url"],
  },
});

const myImages = mongoose.model("MyImages", MyImagesSchema);
module.exports = myImages;
