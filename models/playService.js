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
    locateLoginPage : (params) =>{
        
    }
}