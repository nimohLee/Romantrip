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
        service.validation(loginInfo).then((selectedUser)=>{
            if(selectedUser === "fail"){
                res.send(
                    `<script>
                      alert('이메일 인증 시간을 초과했습니다.');
                      location.href='/';
                    </script>`
                  );
            }else{
                req.session._id = loginInfo.id;
            }

        });
        if (req.session._id === undefined) {
            req.session._id = loginInfo.id;
            
        }
        else {
            console.log("이미 세션이 존재합니다");
        }
    },
    kakaoLogin: (req, res) => {
        const code = req.query.code;
        /* data : token value  */

        service.getKakaoToken(code).then(async (data) => {
            await service.getUserInfo(data).then((returnData) => {
                const userInfo = JSON.parse(returnData);
                if (req.session._id === undefined) {
                    req.session._id = userInfo.id;
                    req.session._name = userInfo.properties.nickname;
                    req.session._token = data;
                    req.session._kakao = "yes";
                } else {
                    console.log("이미 세션이 존재합니다");
                }
            });
            res.redirect("/");
        }
        );
     

    },
    naverLogin: (req, res) => {
        const code = req.query.code;
        
        service.getNaverToken(code).then(async (data) => {
            await service.naverGetUserInfo(data).then((returnData) => {
                const userInfo = JSON.parse(returnData);
                if (req.session._id === undefined) {
                    console.log(req.session._id);
                    req.session._id = userInfo.response.id;
                    req.session._name = userInfo.response.name;
                    req.session._token = data;
                } else {
                    console.log("이미 세션이 존재합니다");
                }
            });
            res.redirect("/");
        });
    },
    logout: async (req, res, next) => {},
};