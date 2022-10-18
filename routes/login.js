const express = require("express");
const router = express.Router();
const controller = require('../controllers/loginController');

router.post('/',controller.basicLogin);
router.get('/kakao',controller.kakaoLogin);
module.exports = router;