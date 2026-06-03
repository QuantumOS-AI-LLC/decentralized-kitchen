const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const cookController = require('../controllers/cookController');
const kitchenController = require('../controllers/kitchenController');
const chatController = require('../controllers/chatController');

// REST API Endpoints
router.get('/state', orderController.getState);
router.post('/orders/dispatch', orderController.dispatchOrder);
router.post('/orders/new', orderController.simulateOrder);
router.post('/cooks/batch', cookController.assignBatch);
router.post('/kitchens/restock', kitchenController.restockKitchen);
router.post('/chat', chatController.processChat);

module.exports = router;
