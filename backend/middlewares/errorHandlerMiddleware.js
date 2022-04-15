const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = req.statusCode ? req.statusCode : 500;

  res.status(statusCode);

  res.json({
    status: "fail",
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandlerMiddleware;
