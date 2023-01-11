const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

router.get("/login",controller.getLogin);

router.post('/login',controller.postLogin);

router.post("/logout",controller.postLogout);

router.get("/kakao/start",controller.startKakaoLogin);

router.get("/kakao/callback",controller.callbackKakaoLogin);

router.get("/naver/start",controller.startNaverLogin);

router.get("/naver/callback",controller.callbackNaverLogin);

router.get("/register", controller.getRegister);

router.post("/register", controller.postRegister);

router.post("/idVaild",controller.validation);

router.post("/updateProc", controller.postUpdate);

router.post("/deleteProc", controller.postDelete);

module.exports = router;