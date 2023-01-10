const service = require("../services/tourService");

module.exports = {
    getRestaurantPage: async (req, res) => {
        await service
            .selectAllTourList("restaurant")
            .then((restaurantResult) => {
                res.render("../views/eat/restaurant", {
                    session: req.session._id,
                    result: restaurantResult,
                });
            })
            .catch(() => {
                res.status(500).send(
                    "<script>alert('데이터를 가져오는 중 에러가 발생했습니다.');history.back();</script>"
                );
            });
    },
    getCafePage: async (req, res) => {
        await service
            .selectAllTourList("cafe")
            .then((cafeResult) => {
                res.render("../views/eat/cafe", {
                    session: req.session._id,
                    result: cafeResult,
                });
            })
            .catch(() => {
                res.status(500).send(
                    "<script>alert('데이터를 가져오는 중 에러가 발생했습니다.');history.back();</script>"
                );
            });
    },
    getMarketPage: async (req, res) => {
        await service
            .selectAllTourList("market")
            .then((marketResult) => {
                res.render("../views/eat/market", {
                    session: req.session._id,
                    result: marketResult,
                });
            })
            .catch(() => {
                res.status(500).send(
                    "<script>alert('데이터를 가져오는 중 에러가 발생했습니다.');history.back();</script>"
                );
            });
    },
};
