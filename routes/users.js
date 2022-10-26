const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

router.get("/", controller.getMain);

router.get("/login",controller.getLogin);

router.post("/logout",controller.postLogout);

router.get("/register", controller.getRegister);

router.post("/register", controller.postRegister);

router.post("/idVaild",controller.validation);

router.post("/updateProc", controller.postUpdate);

router.post("/deleteProc", controller.postDelete);

module.exports = router;