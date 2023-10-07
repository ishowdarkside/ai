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
const fsPromises = require("fs").promises;

exports.createFolder = catchAsync(async (req, res, next) => {
  if (!req.body.folderName)
    return next(new AppError(400, "Please provide folder name!"));

  const folder = new Folder({
    name: req.body.folderName,
    images: [],
  });

  await folder.save();
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

exports.getAllFolders = catchAsync(async (req, res, next) => {
  const folders = await Folder.find();
  res.status(200).json({
    status: "success",
    folders,
  });
});

exports.deleteFolder = catchAsync(async (req, res, next) => {
  const folderDelete = await Folder.findById(req.params.folderId);

  if (!folderDelete) {
    return res
      .status(400)
      .json({ status: "error", message: "Something went wrong" });
  }

  await Promise.all(
    folderDelete.images.map(async (img) => {
      await fsPromises.unlink(`public/${img}`);
    })
  );

  await Folder.findByIdAndDelete(req.params.folderId);
  res.status(200).json({ status: "success", message: "Folder deleted" });
});

exports.updateFolder = catchAsync(async (req, res, next) => {
  const folder = await Folder.findById(req.params.folderId);

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
  res.status(203).json({
    status: "success",
    message: "Updated folder successfully!",
  });
});
