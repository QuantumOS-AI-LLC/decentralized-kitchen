const { dbQueries } = require('../config/db');
const logger = require('../utils/logger');

// Restock the roach coach truck with the lowest current stock
exports.restockKitchen = async (req, res, next) => {
  try {
    const lowestStockTruck = await dbQueries.get('SELECT * FROM mobile_kitchens ORDER BY stock ASC LIMIT 1');
    
    if (!lowestStockTruck) {
      return res.status(400).json({
        success: false,
        message: 'No mobile kitchens found in system.'
      });
    }

    const restockAmt = 50;
    const newStock = lowestStockTruck.stock + restockAmt;
    
    await dbQueries.run('UPDATE mobile_kitchens SET stock = ? WHERE id = ?', [newStock, lowestStockTruck.id]);
    logger.info('Restocked truck %s with %d tamales', lowestStockTruck.name, restockAmt);

    res.json({
      success: true,
      message: `Restocked ${lowestStockTruck.name} with ${restockAmt} fresh tamales.`
    });
  } catch (err) {
    next(err);
  }
};
