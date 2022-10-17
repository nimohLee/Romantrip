const session = require('express-session');
const service = require('../models/loginService');

module.exports = {
    kakaoLogin : (req,res)=>{
        const code = req.query.code;
        /* data : token value  */
        
        service.auth(code).then(async (data)=>{
           const userInfo = await service.getUserInfo(data).then((res)=>{console.log(res)});
           
           
           
            // res.redirect("/?"+data)
        });
    }
}