const express = require("express");
const router = express.Router();
const controller = require('../controllers/playController');

router.get('/',controller.getMain);
router.get('/sightseeing',controller.getSightseeing);
router.get('/relax',controller.getRelax);
router.get('/amusement',controller.getAmusement);
router.get('/leisure',controller.getLeisure);

module.exports = router;