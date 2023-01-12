const service = require("../services/cartService");

module.exports = {
    getCartMainPage: async (req, res) => {
        const sessionID = req.session._id;
        if (sessionID === undefined) {
            res.status(401).send(
                "<script>alert('로그인이 필요합니다'); location.href = '/users/login'</script>"
            );
        } else {
            await service.getCartList(sessionID).then((selectResult) => {
                res.render("../views/cart/index", {
                    session: req.session._id,
                    result: selectResult,
                });
            });
        }
    },
    deleteCartList: async (req, res) => {
        const deleteDto = {
            sessionID: req.session._id,
            tlID: req.body.idx,
        };
        await service
            .deleteList(deleteDto)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch(() => {
                res.status(500);
            });
    },
};
