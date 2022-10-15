const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

router.get("/", controller.getMain);

router.post("/", controller.postRegister);

router.get("/register", controller.getRegister);

router.post("/idVaild",controller.validation);

router.get("/list/page/:page", controller.getList);

router.get("/list/update",controller.getUpdate );

router.post("/updateProc", controller.postUpdate);

router.post("/deleteProc", controller.postDelete);

module.exports = router;
