const logger = require('../utils/logger');

// Production-ready global error handling middleware
function errorHandler(err, req, res, next) {
  logger.error('Unhandled request exception occurred: %s at route %s %s. Stack: %O', 
    err.message, 
    req.method, 
    req.originalUrl, 
    err.stack
  );

  const status = err.status || 500;
  const isProd = process.env.NODE_ENV === 'production';

  res.status(status).json({
    success: false,
    error: {
      message: isProd && status === 500 ? 'Internal Server Error' : err.message,
      ...(isProd ? {} : { stack: err.stack })
    }
  });
}

module.exports = errorHandler;
