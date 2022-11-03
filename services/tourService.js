const { TourList, TourCart } = require("../database/models/index");
const sequelize = require("sequelize");
const { Op } = require("sequelize");

module.exports = {
    selectAllTourList: (params) => {
        return new Promise(async (resolve, reject) => {
            let result = [];                                                                                                                                          
            await TourList.findAll({
                where: {
                    category: params,
                },
                raw: true,
            }).then((tourLists)=>{
                tourLists.forEach((tourlist) => {
                    result.push(tourlist);
                });
                resolve(result);
            }).catch(()=>{
                reject(500);
            });
        });
    },
    /* 세션 TourList에 선택한 idx값이 있을 경우 중복해서 담지 못하게 하기 위한 function */
    checkExistTourList: (tourLists, tourIdx) => {
        let isExist = false;
        tourLists.forEach((tourList) => {
            if (tourList === tourIdx) {
                isExist = true;
            }
        });
        return isExist;
    },
    checkTourCart: (params) => {
        return new Promise(async (resolve, reject) => {
            /* TourCart 테이블에서 회원 아이디가 현재 세션 아이디와 같은 상품 중 현재 선택된 Tour와 동일한 Tour가 있는 지 확인 */
            const isAlreadyShopped = await TourCart.findAll({
                where: {
                    tl_id: params.shoppedIdx,
                    m_id: params.sessionID,
                },
                raw: true,
            });
            if (isAlreadyShopped.length > 0) resolve(true);
            else resolve(false);
        });
    },
    insertTourCart: async (params) => {
        await TourCart.create({
            m_id: params.sessionID,
            tl_id: params.shoppedIdx,
        });
    },
};
