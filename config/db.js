require('dotenv').config();
const { Pool } = require('pg');
const logger = require('../utils/logger');

// Retrieve connection string from env (prefer unpooled for standard direct connect stability)
const connectionString = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  logger.error('No database connection string found in environment variables (DATABASE_URL_UNPOOLED, DATABASE_URL or POSTGRES_URL).');
}

// Connect to PostgreSQL (Neon) using robust pool and SSL config
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  },
  max: 3,                       // Limit connection pool size
  idleTimeoutMillis: 0,         // Keep connections alive to avoid reconnect latency/firewall issues
  connectionTimeoutMillis: 15000 // Wait up to 15 seconds to connect
});

// Prevent unexpected socket drops (e.g. ECONNRESET) on idle connections from crashing the Node process
pool.on('error', (err) => {
  logger.error('Unexpected error on idle client in pool: %O', err);
});

// Helper to retry queries on transient network drops/wakeups
async function executeWithRetry(fn, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries - 1) throw err;
      logger.warn(`Database query failed (attempt ${i + 1}/${retries}). Retrying in ${delay}ms... Error: ${err.message}`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Promisified SQL query helper with SQLite-to-Postgres compatibility
function translateSql(sql) {
  let index = 1;
  // Replace SQLite '?' placeholders with Postgres '$1, $2...' placeholders
  return sql.replace(/\?/g, () => `$${index++}`);
}

const dbQueries = {
  async run(sql, params = []) {
    const pgSql = translateSql(sql);
    try {
      const res = await executeWithRetry(() => pool.query(pgSql, params));
      return { id: res.insertId || (res.rows && res.rows[0] ? res.rows[0].id : null), changes: res.rowCount };
    } catch (err) {
      logger.error('Database query failed: %s with params %O. Error: %O', pgSql, params, err);
      throw err;
    }
  },

  async get(sql, params = []) {
    const pgSql = translateSql(sql);
    try {
      const res = await executeWithRetry(() => pool.query(pgSql, params));
      return res.rows[0] || null;
    } catch (err) {
      logger.error('Database query failed: %s with params %O. Error: %O', pgSql, params, err);
      throw err;
    }
  },

  async all(sql, params = []) {
    const pgSql = translateSql(sql);
    try {
      const res = await executeWithRetry(() => pool.query(pgSql, params));
      return res.rows || [];
    } catch (err) {
      logger.error('Database query failed: %s with params %O. Error: %O', pgSql, params, err);
      throw err;
    }
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
    if (parseInt(cooksCount.count) === 0) {
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
    if (parseInt(kitchenCount.count) === 0) {
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
    if (parseInt(driverCount.count) === 0) {
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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Seed Orders if empty
    const ordersCount = await dbQueries.get('SELECT COUNT(*) as count FROM orders');
    if (parseInt(ordersCount.count) === 0) {
      logger.info('Seeding default orders...');
      await dbQueries.run("INSERT INTO orders (id, customer, destination, source, items, total, status) VALUES ('G-1004', 'Roberto D.', 'Desert Diamond Casino Parking Lot', 'Uber Eats', '12x Pork Red Tamales', 84.00, 'pending')");
      await dbQueries.run("INSERT INTO orders (id, customer, destination, source, items, total, status) VALUES ('G-1003', 'Sandra L.', 'Maryvale Residential', 'Instacart', '24x Sweet Corn Tamales', 168.00, 'completed')");
      await dbQueries.run("INSERT INTO orders (id, customer, destination, source, items, total, status) VALUES ('G-1002', 'Casino Arizona Lounge', 'Loop 101 & McKellips', 'GKIA App', '50x Beef Green Tamales', 350.00, 'completed')");
    }

    logger.info('All Postgres database tables successfully initialized and verified.');
  } catch (err) {
    logger.error('Error initializing Postgres database tables: %O', err);
  }
}

// Automatically initialize database pool and tables with retry logic for serverless compute wakeups
async function startDatabase() {
  try {
    await executeWithRetry(async () => {
      const client = await pool.connect();
      client.release();
    }, 6, 4000); // Retry up to 6 times with a 4s delay (up to 24s total wakeup window)
    logger.info('Connected to Postgres persistent database.');
    await initializeDatabase();
  } catch (err) {
    logger.error('Failed to connect to Postgres database after retries: %O', err);
  }
}

startDatabase();

const db = {
  close(callback) {
    pool.end((err) => {
      if (callback) {
        callback(err);
      }
    });
  }
};

module.exports = {
  dbQueries,
  db
};
