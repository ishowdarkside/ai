const path = require("path");
const catchAsync = require(path.join(
  __dirname,
  "..",
  "utilities",
  "catchAsync"
));
const AppError = require(path.join(__dirname, "..", "utilities", "AppError"));
const axios = require("axios");
const fs = require("fs");
const myImages = require(path.join(__dirname, "..", "models", "MyImages"));
const publicFolderPath = path.join(__dirname, "..", "public");
const { v4: uuid } = require("uuid");

exports.saveImage = catchAsync(async (req, res, next) => {
  const { imageUrl: imageArray } = req.body;
  if (!imageArray)
    return next(
      new AppError(
        400,
        "please provide image url, in order to save it on server"
      )
    );

  imageArray.forEach(async (image) => {
    const response = await axios.get(image, { responseType: "arraybuffer" });
    const uniqueIdentifier = uuid();
    const imagePath = path.join(publicFolderPath, `${uniqueIdentifier}.jpg`);
    fs.writeFileSync(imagePath, Buffer.from(response.data, "binary"));
    const myImage = new myImages({ imageUrl: `${uniqueIdentifier}.jpg` });
    await myImage.save();
  });

  res.status(200).json({
    status: "success",
    message: "Images saved on server",
  });
});

exports.getSavedImages = catchAsync(async (req, res, next) => {
  const images = await myImages.find();
  res.status(200).json({
    status: "success",
    images,
  });
});
