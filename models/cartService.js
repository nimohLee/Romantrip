const { TourList, TourCart } = require("../database/models/index");
const sequelize = require("sequelize");
const { Op } = require("sequelize");

module.exports = {
    getCartList : (params) => {
        return new Promise(async (resolve, reject)=>{
            const result = [];
            const cartLists = await TourCart.findAll({
                where : {
                    m_id : params
                },
                raw : true
            });
           
            cartLists.forEach( async (cartList) => {
                const selectCartList = await TourList.findAll({
                    where :{
                        tl_id : cartList.tl_id
                    },
                    raw : true
                });
                result.push(...selectCartList);
            });

            setTimeout(()=>{
                resolve(result);
            },500)
            
        })
    },
    deleteList : (params) => {
        return new Promise(async (resolve, reject)=>{
            await TourCart.destroy({
                where:{
                    tc_id : params.tcID,
                    m_id : params.sessionID
                }
            });
            resolve("success");
            reject("fail");
        })
    }
}