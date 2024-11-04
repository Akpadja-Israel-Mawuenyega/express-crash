const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ message: err.message });
  }

  res.status(404).json({ message: err.message });
};

export default errorHandler;
