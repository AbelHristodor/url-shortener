const morgan = require('morgan');
const logger = require('./winston');

const stream = {
  write: (msg) => logger.http(msg),
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip },
);

module.exports = morganMiddleware;
