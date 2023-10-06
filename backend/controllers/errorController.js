const errorMiddleware = (err, req, res, next) => {
  if (process.env.NODE_ENV == "dev") {
    return res.status(500).json({
      err,
      message: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "production") {
    if (err.code === 11000) {
      return res.status(400).json({
        status: "fail",
        message: "Folder name already in use",
      });
    }
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: "fail",
        message: err.message,
      });
    } else {
      return res.status(500).json({
        status: "error",
        message: "Something went really wrong!",
      });
    }
  }
};

module.exports = errorMiddleware;
