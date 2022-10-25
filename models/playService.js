const { TourList } = require("../database/models/index");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const tourlist = require("../database/models/TourList");

module.exports = {
    selectAllTourList : (params)=>{
        return new Promise(async (resolve, reject)=>{
            let result = [];
            const tourLists = await TourList.findAll({
                where : {
                    category : params
                },
                raw : true
            });

            tourLists.forEach((tourlist)=>{
                result.push(tourlist);
            })
            resolve(result);
        })
        
        


    },
    /* 세션 TourList에 선택한 idx값이 있을 경우 중복해서 담지 못하게 하기 위한 function */
    checkExistTourList : (tourLists, tourIdx) =>{
        let isExist = false;
        tourLists.forEach((tourList)=>{
            if(tourList === tourIdx){
                isExist = true;
            }   
        });
        return isExist;
        
    }
}