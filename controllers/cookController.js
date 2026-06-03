const { dbQueries } = require('../config/db');
const logger = require('../utils/logger');

// Assign a new batch of tamales to a standby cook or pending cook
exports.assignBatch = async (req, res, next) => {
  try {
    // Find active cook with 0 active batch
    let targetCook = await dbQueries.get("SELECT * FROM cooks WHERE activeBatch = 0 AND status = 'active' LIMIT 1");
    let assignSize = 100;

    if (!targetCook) {
      // Find a pending cook
      targetCook = await dbQueries.get("SELECT * FROM cooks WHERE status = 'pending' LIMIT 1");
      assignSize = 150;
    }

    if (!targetCook) {
      return res.status(400).json({
        success: false,
        message: 'All cooks are currently cooking at max capacity.'
      });
    }

    await dbQueries.run(
      "UPDATE cooks SET status = 'active', activeBatch = ? WHERE id = ?",
      [assignSize, targetCook.id]
    );

    logger.info('Assigned batch of %d tamales to cook %s', assignSize, targetCook.name);

    res.json({
      success: true,
      message: `Assigned a new batch of ${assignSize} tamales to ${targetCook.name}.`
    });
  } catch (err) {
    next(err);
  }
};
