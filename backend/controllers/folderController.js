const path = require("path");
const Folder = require(path.join(__dirname, "..", "models", "Folder"));
const catchAsync = require(path.join(
  __dirname,
  "..",
  "utilities",
  "catchAsync"
));
const AppError = require(path.join(__dirname, "..", "utilities", "AppError"));
const sharp = require("sharp");

exports.createFolder = catchAsync(async (req, res, next) => {
  if (!req.body.folderName)
    return next(new AppError(400, "Please provide folder name!"));

  const folder = new Folder({
    name: req.body.folderName,
    images: [],
  });
  for (const file of req.files) {
    if (!file.mimetype.startsWith("image"))
      return next(new AppError(400, "Please provide correct image type"));
    const filename = `${file.originalname
      .split(" ")
      .join("")}-${Date.now()}.jpeg`;
    try {
      await sharp(file.buffer)
        .resize(800, 800)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/${filename}`);

      folder.images.push(filename);
    } catch (err) {
      console.error(`Error processing image ${file.originalname}:`, err);
    }
  }

  await folder.save();

  res.status(201).json({
    status: "success",
    message: "Folder created successfully!",
  });
});
