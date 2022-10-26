const express = require("express");
const router = express.Router();
const controller = require('../controllers/eatController');

router.get('/restaurant',controller.getRestaurantPage);
router.get('/cafe',controller.getCafePage);
router.get('/market',controller.getMarketPage);


module.exports = router;