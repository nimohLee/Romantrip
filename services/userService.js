const db = require("../config/db");

const { User } = require("../database/models/index");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
module.exports = {
    register : async (params)=>{
        await User.create({
            name : params.name,
            id : params.id,
            pw : params.pw,
            email : params.email,
            regDate : new Date()
        })
    },
    validator : (params) =>{
        return new Promise(async (resolve,reject)=>{
            const result = await User.findAll({
                where : {
                    id : params.id
                },
                raw : true
            });
            if(result[0]){
                resolve("No");
            }else
                resolve("Yes");
        })
    }
}
