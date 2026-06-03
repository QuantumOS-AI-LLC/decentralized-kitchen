const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const logger = require('./utils/logger');
const apiRoutes = require('./routes/api');
const errorHandler = require('./middleware/errorHandler');

// Initialize database
const { db } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS and parsing middleware
app.use(cors());
app.use(express.json());

// Bind HTTP Request Logger (Morgan) through Winston stream
app.use(morgan(':method :url :status :res[content-length] - :response-time ms', {
  stream: {
    write: (message) => logger.info(message.trim(), { service: 'http' })
  }
}));

// Serve static frontend files
app.use(express.static(path.join(__dirname, './public')));

// Bind API routes
app.use('/api', apiRoutes);

// Catch-all route to serve SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// Bind Centralized Error Handler
app.use(errorHandler);

// Listen on Port (only if run directly)
if (require.main === module) {
  app.listen(PORT, () => {
    logger.info(`GKIA Production-grade MVC Server listening on http://localhost:${PORT}`);
  });
}

// Graceful Shutdown
process.on('SIGINT', () => {
  logger.info('SIGINT signal received. Shutting down server gracefully...');
  db.close((err) => {
    if (err) {
      logger.error('Error closing database connection: %O', err);
    } else {
      logger.info('SQLite database connection closed.');
    }
    process.exit(0);
  });
});

module.exports = app;
