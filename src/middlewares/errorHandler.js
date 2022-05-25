const CustomError = require('../errors/CustomError');

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ error: err });
  }
  return res.status(400).send({
    error: { message: 'Something went wrong' },
  });
};

module.exports = errorHandler;
