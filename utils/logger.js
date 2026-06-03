const winston = require('winston');
const path = require('path');

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

const logger = winston.createLogger({
  level: 'info',
  format: logFormat,
  defaultMeta: { service: 'gkia-backend' },
  transports: [
    // Write all logs with level 'error' and below to error.log
    new winston.transports.File({ 
      filename: path.join(__dirname, '../logs/error.log'), 
      level: 'error' 
    }),
    // Write all logs with level 'info' and below to app.log
    new winston.transports.File({ 
      filename: path.join(__dirname, '../logs/app.log') 
    })
  ]
});

// If not in production, log to console as well with colorized formatting
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.printf(({ timestamp, level, message, service, ...metadata }) => {
        let metaStr = Object.keys(metadata).length ? JSON.stringify(metadata) : '';
        return `[${timestamp}] [${level}] [${service}]: ${message} ${metaStr}`;
      })
    )
  }));
}

module.exports = logger;
