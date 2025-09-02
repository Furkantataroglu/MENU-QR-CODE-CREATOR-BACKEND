const errorHandling = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.status || 500;
  res.status(statusCode).json({
    status: statusCode,
    message: err.userMessage || "Something went wrong",
    error: err.message,
  });
};

export default errorHandling;
