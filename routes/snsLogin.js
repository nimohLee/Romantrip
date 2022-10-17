const express = require("express");
const router = express.Router();
const controller = require('../controllers/snsLoginController');

router.get('/kakao',controller.kakaoLogin);


module.exports = router;