const tryCatch = (callback) => {
  return (req, res, next) => {
    callback(req, res, next).catch((error) => {
      const myCustomError = new Error(
        "Incorrect input or such a mail already exists"
      );
      myCustomError.cause = error; // сохранение оригинальной ошибки в свойстве "cause"
      next(myCustomError);
    });
  };
};

module.exports = {
  tryCatch,
};
