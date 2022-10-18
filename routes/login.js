const express = require("express");
const router = express.Router();
const controller = require('../controllers/loginController');

router.post('/',controller.basicLogin);
router.get('/kakao',controller.kakaoLogin);
router.get('/naver',controller.naverLogin);
router.get('/logout',controller.logout);
module.exports = router;