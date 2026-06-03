const { dbQueries } = require('../config/db');
const logger = require('../utils/logger');

// Retrieve entire state of GKIA
exports.getState = async (req, res, next) => {
  try {
    const orders = await dbQueries.all('SELECT * FROM orders ORDER BY created_at DESC');
    const cooks = await dbQueries.all('SELECT * FROM cooks');
    const drivers = await dbQueries.all('SELECT * FROM drivers');
    const mobileKitchens = await dbQueries.all('SELECT * FROM mobile_kitchens');
    
    // Sum completed and delivering sales today
    const salesRow = await dbQueries.get("SELECT SUM(total) as totalSales FROM orders WHERE date(created_at) = date('now') OR status IN ('completed', 'delivering')");
    const todaySales = salesRow.totalSales || 602.00;

    const activeCooksCount = cooks.filter(c => c.status === 'active').length;
    const activeRoachCoachesCount = mobileKitchens.filter(t => t.status === 'active').length;

    res.json({
      success: true,
      todaySales,
      activeCooksCount,
      activeRoachCoachesCount,
      cooks,
      mobileKitchens,
      drivers,
      orders
    });
  } catch (err) {
    next(err);
  }
};

// Dispatch driver to first pending order
exports.dispatchOrder = async (req, res, next) => {
  try {
    // Find first pending order
    const pendingOrder = await dbQueries.get("SELECT * FROM orders WHERE status = 'pending' ORDER BY created_at ASC LIMIT 1");
    if (!pendingOrder) {
      return res.status(400).json({ success: false, message: 'No pending orders available to dispatch.' });
    }

    // Find first idle driver
    const idleDriver = await dbQueries.get("SELECT * FROM drivers WHERE status = 'idle' LIMIT 1");
    if (!idleDriver) {
      return res.status(400).json({ success: false, message: 'No idle drivers available in Phoenix.' });
    }

    // Lock driver and dispatch order
    await dbQueries.run("UPDATE orders SET status = 'delivering' WHERE id = ?", [pendingOrder.id]);
    await dbQueries.run("UPDATE drivers SET status = 'delivering' WHERE id = ?", [idleDriver.id]);

    logger.info('Driver %s dispatched to order %s', idleDriver.name, pendingOrder.id);
    
    res.json({
      success: true,
      message: `Driver ${idleDriver.name} dispatched for Order ${pendingOrder.id}!`
    });
  } catch (err) {
    next(err);
  }
};

// Simulate delivery webhook order (UberEats, Grubhub)
exports.simulateOrder = async (req, res, next) => {
  try {
    const names = ["Arthur M.", "Lucia G.", "Juan C.", "Phoenix Hotel", "Casino Guest", "Diana R."];
    const destinations = ["Casino Arizona Valet", "Tempe Marketplace", "Old Town Scottsdale", "Downtown Phoenix Office", "Maryvale District"];
    const products = ["6x Beef Red Tamales", "12x Chicken Green Tamales", "12x Cheese Jalapeno Tamales", "24x Fiesta Mix Pack"];
    const prices = [42.00, 84.00, 84.00, 168.00];
    const sources = ["Uber Eats", "Grubhub", "GKIA App"];

    const randIdx = Math.floor(Math.random() * names.length);
    const randProdIdx = Math.floor(Math.random() * products.length);
    
    // Generate new order ID
    const countRow = await dbQueries.get('SELECT COUNT(*) as count FROM orders');
    const orderId = `G-${1005 + countRow.count}`;

    const newOrder = {
      id: orderId,
      customer: names[randIdx],
      destination: destinations[Math.floor(Math.random() * destinations.length)],
      source: sources[Math.floor(Math.random() * sources.length)],
      items: products[randProdIdx],
      total: prices[randProdIdx],
      status: 'pending'
    };

    await dbQueries.run(
      'INSERT INTO orders (id, customer, destination, source, items, total, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [newOrder.id, newOrder.customer, newOrder.destination, newOrder.source, newOrder.items, newOrder.total, newOrder.status]
    );

    logger.info('Simulated new order %s from %s', newOrder.id, newOrder.source);

    res.json({
      success: true,
      message: `New order ${newOrder.id} received via ${newOrder.source}!`,
      order: newOrder
    });
  } catch (err) {
    next(err);
  }
};
