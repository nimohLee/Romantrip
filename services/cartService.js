const { TourList, TourCart } = require("../database/models/index");

module.exports = {
    /**
     * 
     * @param {Number} sessionId 현재 사용자 세션 ID
     * @returns resolve of reject
     */
    getCartList: (sessionId) => {
        return new Promise(async (resolve, reject) => {
            const result = [];
            const cartLists = await TourCart.findAll({
                where: {
                    m_id: sessionId,
                },
                order: [["tl_id", "ASC"]],
                raw: true,
            });

            cartLists.forEach(async (cartList) => {
                const selectCartList = await TourList.findAll({
                    where: {
                        tl_id: cartList.tl_id,
                    },
                    raw: true,
                });
                result.push(...selectCartList);
            });

            setTimeout(() => {
                resolve(result);
            }, 500);
        });
    },
    /**
     * 
     * @param {Object} deleteDto 현재 세션 ID와, 삭제하려는 Cart List의 idx값이 담긴 DTO
     * @returns Resolve or Reject
     */
    deleteList: (deleteDto) => {
        return new Promise(async (resolve, reject) => {
            await TourCart.destroy({
                where: {
                    tl_id: deleteDto.tlID,
                    m_id: deleteDto.sessionID,
                },
            })
                .then(() => {
                    resolve("success");
                })
                .catch(() => {
                    reject("fail");
                });
        });
    },
};
