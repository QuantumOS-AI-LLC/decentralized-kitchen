const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const logger = require('../utils/logger');

const dbPath = path.join(__dirname, '../gkia.db');

// Ensure parent dir exists
const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Connect to SQLite DB
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    logger.error('Failed to connect to SQLite database: %O', err);
  } else {
    logger.info('Connected to SQLite persistent database at: %s', dbPath);
    initializeDatabase();
  }
});

// Promisified DB wrappers for async/await syntax
const dbQueries = {
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) {
          logger.error('Database run query failed: %s with params %O. Error: %O', sql, params, err);
          reject(err);
        } else {
          resolve({ id: this.lastID, changes: this.changes });
        }
      });
    });
  },

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) {
          logger.error('Database get query failed: %s with params %O. Error: %O', sql, params, err);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) {
          logger.error('Database all query failed: %s with params %O. Error: %O', sql, params, err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
};

// Database Schema & Seed Data Initialization
async function initializeDatabase() {
  try {
    // 1. Cooks Table
    await dbQueries.run(`
      CREATE TABLE IF NOT EXISTS cooks (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        location TEXT NOT NULL,
        rating REAL DEFAULT 5.0,
        activeBatch INTEGER DEFAULT 0,
        status TEXT DEFAULT 'pending'
      )
    `);

    // Seed Cooks if empty
    const cooksCount = await dbQueries.get('SELECT COUNT(*) as count FROM cooks');
    if (cooksCount.count === 0) {
      logger.info('Seeding default stay-at-home cooks...');
      await dbQueries.run("INSERT INTO cooks VALUES ('cook-1', 'Maria Sanchez', 'Maryvale, Phoenix', 4.9, 120, 'active')");
      await dbQueries.run("INSERT INTO cooks VALUES ('cook-2', 'Elena Rodriguez', 'South Phoenix', 4.8, 0, 'pending')");
      await dbQueries.run("INSERT INTO cooks VALUES ('cook-3', 'Juana Martinez', 'Glendale, AZ', 4.9, 80, 'active')");
    }

    // 2. Mobile Kitchens Table
    await dbQueries.run(`
      CREATE TABLE IF NOT EXISTS mobile_kitchens (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        contact TEXT NOT NULL,
        stock INTEGER DEFAULT 0,
        status TEXT DEFAULT 'active'
      )
    `);

    // Seed Mobile Kitchens if empty
    const kitchenCount = await dbQueries.get('SELECT COUNT(*) as count FROM mobile_kitchens');
    if (kitchenCount.count === 0) {
      logger.info('Seeding default mobile kitchen vendors...');
      await dbQueries.run("INSERT INTO mobile_kitchens VALUES ('truck-1', 'Antojitos El Sol', 'Jose L.', 45, 'active')");
      await dbQueries.run("INSERT INTO mobile_kitchens VALUES ('truck-2', 'Phoenix Taco Express', 'Mateo R.', 12, 'active')");
      await dbQueries.run("INSERT INTO mobile_kitchens VALUES ('truck-3', 'Tamales Don Lupe', 'Lupe H.', 80, 'active')");
    }

    // 3. Drivers Table
    await dbQueries.run(`
      CREATE TABLE IF NOT EXISTS drivers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        status TEXT DEFAULT 'idle',
        vehicle TEXT NOT NULL
      )
    `);

    // Seed Drivers if empty
    const driverCount = await dbQueries.get('SELECT COUNT(*) as count FROM drivers');
    if (driverCount.count === 0) {
      logger.info('Seeding default delivery drivers...');
      await dbQueries.run("INSERT INTO drivers VALUES ('driver-1', 'Carlos Perez', 'delivering', 'Honda Civic')");
      await dbQueries.run("INSERT INTO drivers VALUES ('driver-2', 'Miguel Torres', 'idle', 'Toyota Prius')");
      await dbQueries.run("INSERT INTO drivers VALUES ('driver-3', 'Sofia Gomez', 'offline', 'E-Bike')");
    }

    // 4. Orders Table
    await dbQueries.run(`
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        customer TEXT NOT NULL,
        destination TEXT NOT NULL,
        source TEXT NOT NULL,
        items TEXT NOT NULL,
        total REAL NOT NULL,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Seed Orders if empty
    const ordersCount = await dbQueries.get('SELECT COUNT(*) as count FROM orders');
    if (ordersCount.count === 0) {
      logger.info('Seeding default orders...');
      await dbQueries.run("INSERT INTO orders (id, customer, destination, source, items, total, status) VALUES ('G-1004', 'Roberto D.', 'Desert Diamond Casino Parking Lot', 'Uber Eats', '12x Pork Red Tamales', 84.00, 'pending')");
      await dbQueries.run("INSERT INTO orders (id, customer, destination, source, items, total, status) VALUES ('G-1003', 'Sandra L.', 'Maryvale Residential', 'Instacart', '24x Sweet Corn Tamales', 168.00, 'completed')");
      await dbQueries.run("INSERT INTO orders (id, customer, destination, source, items, total, status) VALUES ('G-1002', 'Casino Arizona Lounge', 'Loop 101 & McKellips', 'GKIA App', '50x Beef Green Tamales', 350.00, 'completed')");
    }

    logger.info('All database tables successfully initialized and verified.');
  } catch (err) {
    logger.error('Error initializing SQLite database tables: %O', err);
  }
}

module.exports = {
  dbQueries,
  db
};
