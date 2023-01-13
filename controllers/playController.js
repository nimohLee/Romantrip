const service = require("../services/tourService");

module.exports = {
    getSightseeingPage: async (req, res) => {
        await service
            .selectAllTourList("sightseeing")
            .then((sightseeingResult) => {
                res.render("../views/play/sightseeing", {
                    session: req.session._id,
                    result: sightseeingResult,
                });
            })
            .catch(() => {
                res.status(500).send(
                    "<script>alert('데이터를 가져오는 중 에러가 발생했습니다.');history.back();</script>"
                );
            });
    },
    getAmusementPage: async (req, res) => {
        await service
            .selectAllTourList("amusement")
            .then((amusementResult) => {
                res.render("../views/play/amusement", {
                    session: req.session._id,
                    result: amusementResult,
                });
            })
            .catch(() => {
                res.status(500).send(
                    "<script>alert('데이터를 가져오는 중 에러가 발생했습니다.');history.back();</script>"
                );
            });
    },
    getLeisurePage: async (req, res) => {
        await service
            .selectAllTourList("leisure")
            .then((leisureResult) => {
                res.render("../views/play/leisure", {
                    session: req.session._id,
                    result: leisureResult,
                });
            })
            .catch(() => {
                res.status(500).send(
                    "<script>alert('데이터를 가져오는 중 에러가 발생했습니다.');history.back();</script>"
                );
            });
    },
    postShopping: async (req, res) => {
        if (req.session._id) {
            const shopDto = {
                shoppedIdx: parseInt(req.params.idx),
                sessionID: req.session._id,
            };
            await service.checkTourCart(shopDto).then((isAlreadyShopped) => {
                if (isAlreadyShopped) {
                    res.sendStatus(409);
                } else {
                    service.insertTourCart(shopDto);
                    res.sendStatus(201);
                }
            });
        } else {
            res.sendStatus(401);
        }
    },
};
