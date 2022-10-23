const express = require("express");
const router = express.Router();
const controller = require('../controllers/playController');

router.get('/',controller.getMainPage);
router.get('/sightseeing',controller.getSightseeingPage);
router.get('/amusement',controller.getAmusementPage);
router.get('/leisure',controller.getLeisurePage);

module.exports = router;