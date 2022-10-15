const express = require('express');
const router = express.Router();
const controller = require('../controllers/boardController');

router.get("/page/:page",controller.getMain);

router.get("/write",controller.getWrite);

router.post("/writeProc",controller.postWrite);

router.get("/detail/:id",controller.getDetail);

router.post("/detail/deleteProc", controller.postDelete);

router.get("/detail/update/:id",controller.getUpdate);

router.post("/detail/update/:id",controller.postUpdate);

module.exports = router;