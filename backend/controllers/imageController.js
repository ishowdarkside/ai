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
const fsPromises = require("fs").promises;

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
  const images = await myImages.find({ isProductImage: false });
  res.status(200).json({
    status: "success",
    images,
  });
});
exports.resizeProduct = catchAsync(async (req, res, next) => {
  const { width: productWidth, height: productHeight } = req.body;
  const data = await sharp(req.file.buffer)
    .resize({
      width: parseInt(productWidth * 1.8),
      height: parseInt(productHeight * 1.8),
      fit: "inside",
    })
    .toBuffer();
  const resizedImage = data.toString("base64");

  //ubaciti funkcionlanost da se slika save-a na backend
  res.status(200).json({
    status: "success",
    message: "Image saved successfully!",
    resizedProduct: "data:image/png;base64," + resizedImage,
  });
});

exports.resizeImage = catchAsync(async (req, res, next) => {
  const { image } = req.body;

  const imageBase64 = image.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(imageBase64, "base64");
  const { width: productWidth, height: productHeight } = req.body;
  const data = await sharp(buffer)
    .resize(productWidth, productHeight, {
      fit: "fill",
    })
    .toBuffer();

  const resizedImage = data.toString("base64");

  //save-aj image i saaveaj u bazu kao productImage

  return res.status(200).json({
    status: "success",
    image: "data:image/png;base64," + resizedImage,
  });
});

exports.deleteImage = catchAsync(async (req, res, next) => {
  const image = await myImages.findById(req.params.imageId);
  const aiFolder = await Folder.findOne({ name: "AI Generated images" });
  aiFolder.images = aiFolder.images.filter((e) => e !== image.imageUrl);
  await fsPromises.unlink(`public/${image.imageUrl}`);
  await myImages.findByIdAndDelete(req.params.imageId);
  await aiFolder.save({ validateBeforeSave: false });
  res.status(204).json({
    status: "success",
  });
});

exports.getProductImages = catchAsync(async (req, res, next) => {
  const productImages = await myImages.find({ isProductImage: true });

  res.status(200).json({
    status: "success",
    productImages,
  });
});

exports.convertToByte = catchAsync(async (req, res, next) => {
  const { imageUrl } = req.body;

  // Fetch the image using Axios
  const imageResponse = await axios.get(imageUrl, {
    responseType: "arraybuffer",
  });

  // Convert the image data to bytes
  const imageBase64 = Buffer.from(imageResponse.data, "binary").toString(
    "base64"
  );

  res.status(200).json({
    status: "success",
    imageBase64: "data:image/png;base64," + imageBase64,
  });
});

exports.saveProductImage = catchAsync(async (req, res, next) => {
  const { imageBase64 } = req.body;
  const Base64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
  const uniqueIdentifier = uuid();
  await myImages.create({
    imageUrl: `${uniqueIdentifier}.jpeg`,
    isProductImage: true,
  });
  fs.writeFile(`public/${uniqueIdentifier}.jpeg`, Base64, "base64", (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error saving the image." });
    } else {
      console.log("Image saved successfully.");
    }
  });

  res.status(200).json({
    status: "success",
    message: "Product image saved successfully!",
  });
});

exports.saveAiImage = catchAsync(async (req, res, next) => {
  const { url } = req.body;

  const aiFolder = await Folder.findOne({ name: "AI Generated images" });
  const response = await axios.get(url, { responseType: "arraybuffer" });

  const uniqueIdentifier = uuid();
  await sharp(response.data)
    .resize(1024, 1024)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/${uniqueIdentifier}.jpeg`);

  aiFolder.images.push(`${uniqueIdentifier}.jpeg`);

  await aiFolder.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
    message: "Image saved successfully!",
  });
});
