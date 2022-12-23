const { User } = require("../database/models/index");

module.exports = {
    register : async (params)=>{
        try{
            await User.create({
                name : params.name,
                id : params.id,
                pw : params.pw,
                email : params.email,
                regDate : new Date()
            });
        }catch(err){
            throw err;
        }
        
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
