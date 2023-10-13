const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");
const catchAsync = require(path.join(
  __dirname,
  "..",
  "utilities",
  "catchAsync"
));
const AppError = require(path.join(__dirname, "..", "utilities", "AppError"));
const { v4: uuid } = require("uuid");
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
const sharp = require("sharp");

exports.generateImageEdit = catchAsync(async (req, res, next) => {
  const base64ImageProduct = req.body.image.split(";base64,").pop();
  const pathProduct = `public/img-${uuid()}.png`;
  const imageBufferProduct = Buffer.from(base64ImageProduct, "base64");

  const base64ImageMask = req.body.mask.split(";base64,").pop();
  const pathMask = `public/imgmask-${uuid()}.png`;
  const imageBufferMask = Buffer.from(base64ImageMask, "base64");

  await sharp(imageBufferProduct)
    .toFormat("png")
    .toColorspace("srgb")
    .toFile(pathProduct);

  await sharp(imageBufferMask)
    .toFormat("png")
    .toColorspace("srgb")
    .toFile(pathMask);

  const response = await openai.images.edit({
    image: fs.createReadStream(pathProduct),
    mask: pathMask,
    prompt: req.body.prompt,
  });
  fs.unlink(pathProduct, () => console.log("Deleted"));
  fs.unlink(pathMask, () => console.log("Deleted"));

  res.status(200).json({
    status: "success",
    response,
  });
});
