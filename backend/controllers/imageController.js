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
const Folder = require(path.join(__dirname, "..", "models", "Folder"));
const publicFolderPath = path.join(__dirname, "..", "public");
const { v4: uuid } = require("uuid");
const sharp = require("sharp");

exports.saveImage = catchAsync(async (req, res, next) => {
  const { imageUrl: imageArray } = req.body;
  const aiFolder = await Folder.findOne({ name: "AI Generated images" });
  if (!imageArray)
    return next(
      new AppError(
        400,
        "please provide image url, in order to save it on server"
      )
    );

  const promises = imageArray.map(async (image) => {
    const response = await axios.get(image, { responseType: "arraybuffer" });
    const uniqueIdentifier = uuid();
    await sharp(response.data)
      .resize(800, 800)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/${uniqueIdentifier}.jpeg`);

    const myImage = new myImages({ imageUrl: `${uniqueIdentifier}.jpeg` });
    aiFolder.images.push(`${uniqueIdentifier}.jpeg`);
    await myImage.save();
  });

  // Wait for all promises to resolve before saving the folder
  await Promise.all(promises);

  // Save the folder after all images have been processed and saved
  await aiFolder.save({ validateBeforeSave: false });

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
exports.resizeProduct = catchAsync(async (req, res, next) => {
  const { productImage } = req.body;
  const productBase64 = productImage.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(productBase64, "base64");

  const data = await sharp(buffer)
    .resize({ width: 200, height: 200, fit: "inside" })
    .toBuffer();
  const resizedImage = data.toString("base64");

  //ubaciti funkcionlanost da se slika save-a na backend
  res.status(200).json({
    status: "success",
    message: "Image saved successfully!",
    resizedProduct: "data:image/png;base64," + resizedImage,
  });
});
