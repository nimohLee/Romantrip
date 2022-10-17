const service = require('../models/loginService');

module.exports = {
    kakaoLogin : async (req,res)=>{
        await service.auth(req.query.code).then((data)=>{res.redirect("/?"+data)});      
    }
}