const express = require("express");
const router = express.Router();
const controller = require('../controllers/eatController');

router.get('/',controller.getMain);
router.get('/restaurant',controller.getRestaurant);
router.get('/cafe',controller.getCafe);
router.get('/market',controller.getMarket);


module.exports = router;