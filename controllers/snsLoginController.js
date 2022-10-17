const session = require('express-session');
const service = require('../models/loginService');

module.exports = {
    basicLogin : (req,res)=>{
        const loginInfo = {
            id : req.body.id,
            pw : req.body.pw,
        }
        req.session._id = loginInfo.id;
        req.session._pw = loginInfo.pw;
        console.log(req.session._id);
    },
    kakaoLogin : (req,res)=>{
        const code = req.query.code;
        /* data : token value  */
        
        service.auth(code).then(async (data)=>{
           const userInfo = await service.getUserInfo(data).then((res)=>{console.log(res)});
                      
            // res.redirect("/?"+data)
        });
    }
}