const session = require('express-session');
const service = require('../models/loginService');

module.exports = {
    basicLogin : (req,res)=>{
        const loginInfo = {
            id : req.body.id,
            pw : req.body.pw,
        }
        if(req.session._id === undefined)
            req.session._id = loginInfo.id;
        else{
            console.log("이미 세션이 존재합니다")
        }

    },
    kakaoLogin : (req,res)=>{
        const code = req.query.code;
        /* data : token value  */
        
        service.auth(code).then(async (data)=>{
           await service.getUserInfo(data).then((returnData)=>
           {const userInfo = JSON.parse(returnData);
            if(req.session._id === undefined){
            req.session._id = userInfo.id;
            req.session._name = userInfo.properties.nickname;
            }
            else
                {console.log("이미 세션이 존재합니다");
                console.log(req.session._name)}
        });
            res.redirect("/");
        });
    }
}