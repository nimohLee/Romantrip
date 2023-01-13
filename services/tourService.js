const { TourList, TourCart } = require("../database/models/index");
const sequelize = require("sequelize");
const { Op } = require("sequelize");

module.exports = {
    /**
     * 
     * @param {String} tourCategory 여행의 카테고리 ( 관광, 레저, 식당 등)
     * @returns 
     */
    selectAllTourList: (tourCategory) => {
        return new Promise(async (resolve, reject) => {
            let result = [];
            await TourList.findAll({
                where: {
                    category: tourCategory,
                },
                raw: true,
            })
                .then((tourLists) => {
                    tourLists.forEach((tourlist) => {
                        result.push(tourlist);
                    });
                    resolve(result);
                })
                .catch(() => {
                    reject(500);
                });
        });
    },
    /* 세션 TourList에 선택한 idx값이 있을 경우 중복해서 담지 못하게 하기 위한 function */
    /**
     * 
     * @param {*} tourLists 
     * @param {*} tourIdx 
     * @returns 
     */
    checkExistTourList: (tourLists, tourIdx) => {
        let isExist = false;
        tourLists.forEach((tourList) => {
            if (tourList === tourIdx) {
                isExist = true;
            }
        });
        return isExist;
    },
    /**
     * 
     * @param {Object} shopDto 장바구니에 넣기위한 해당 여행의 idx값과 현재 유저 세션 id  
     * @returns Promise 결과 값
     */
    checkTourCart: (shopDto) => {
        return new Promise(async (resolve, reject) => {
            /* TourCart 테이블에서 회원 아이디가 현재 세션 아이디와 같은 상품 중 현재 선택된 Tour와 동일한 Tour가 있는 지 확인 */
            const isAlreadyShopped = await TourCart.findAll({
                where: {
                    tl_id: shopDto.shoppedIdx,
                    m_id: shopDto.sessionID,
                },
                raw: true,
            });
            if (isAlreadyShopped.length > 0) resolve(true);
            else resolve(false);
        });
    },
    /**
     * 
     * @param {Object} shipDto 장바구니에 넣기위한 해당 여행의 idx값과 현재 유저 세션 id
     */
    insertTourCart: async (shopDto) => {
        await TourCart.create({
            m_id: shopDto.sessionID,
            tl_id: shopDto.shoppedIdx,
        });
    },
};
