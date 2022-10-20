const request = require("request");
const session = require("express-session");
const service = require("../models/loginService");
const url = require("url");

module.exports = {
    basicLogin: (req, res) => {
        /* DB랑 연결해서 로그인 유효성검사하기 */
        const loginInfo = {
            id: req.body.id,
            pw: req.body.pw,
        };
        service.validation(loginInfo).then((selectedUser) => {
            let result;
            if (selectedUser === "fail") {
                result = "fail";
            } else {
                req.session._id = loginInfo.id;
                result = "success";
            }

            res.send({ result });
        });
        // if (req.session._id === undefined) {
        //     req.session._id = loginInfo.id;
        // } else {
        //     console.log("이미 세션이 존재합니다");
        // }
    },
    kakaoLogin: (req, res) => {
        const code = req.query.code;
        /* data : token value  */
        service.getKakaoToken(code).then(async (data) => {
            await service.getUserInfo(data).then((returnData) => {
                const userInfo = JSON.parse(returnData);
                /* 카카오와 네이버로그인 -> DB INSERT 함수인 createSnsUser()를 카카오와 네이버에서 재사용할 수있도록 새로운 객체 userObj 정의 */
                const userObj = {
                    id: userInfo.id,
                    name: userInfo.properties.nickname,
                };
                if (req.session._id === undefined) {
                    req.session._id = userObj.id;
                    req.session._name = userObj.name;
                    req.session._token = data;
                    req.session._kakao = "yes";
                    service.createSnsUser("kakao", userObj);
                } else {
                    console.log("이미 세션이 존재합니다");
                }
            });
            res.render('index',{session : req.session._id});    
        });
        
    },
    naverLogin: (req, res) => {
        const code = req.query.code;
        /* 카카오와 네이버로그인 -> DB INSERT 함수인 createSnsUser()를 카카오와 네이버에서 재사용할 수있도록 새로운 객체 userObj 정의 */
        service.getNaverToken(code).then(async (data) => {
            await service.naverGetUserInfo(data).then((returnData) => {
                const userInfo = JSON.parse(returnData);
                const userObj = {
                    id: userInfo.response.id,
                    name: userInfo.response.name,
                };
                if (req.session._id === undefined) {
                    req.session._id = userObj.id;
                    req.session._name = userObj.name;
                    req.session._token = data;
                    service.createSnsUser("naver", userObj);
                } else {
                    console.log("이미 세션이 존재합니다");
                }
            });
            res.render('index',{session : req.session._id});
        });
        
    },
    logout: async (req, res, next) => {},
};
