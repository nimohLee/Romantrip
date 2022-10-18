const request  = require('request');
const session = require('express-session');
const service = require('../models/loginService');
const url = require('url');

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
        
        service.getKakaoToken(code).then(async (data)=>{
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
    },
    naverLogin : (req,res)=>{
        const code = req.query.code;
        service.getNaverToken(code).then(async (data)=>{
            await service.naverGetUserInfo(data).then((returnData)=>{
                const userInfo = JSON.parse(returnData);
                console.log(userInfo.response);
            if(req.session._id === undefined){
            console.log(req.session._id);
            req.session._id = userInfo.response.id;
            req.session._name = userInfo.response.name;
            
            }
            else
                {console.log("이미 세션이 존재합니다");
                console.log(req.session._name)}
            })
            res.redirect("/");
        });
        
    }
}