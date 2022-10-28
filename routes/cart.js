const express = require('express');
const router = express.Router();
const controller = require('../controllers/cartController');

router.get("/",controller.getCartMainPage);
router.delete("/list",controller.deleteCartList);


module.exports = router;