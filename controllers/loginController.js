const service = require("../services/loginService");
const url = require("url");

module.exports = {
    basicLogin: (req, res) => {
        const loginInfo = {
            id: req.body.id,
            pw: req.body.pw,
        };
        service.validation(loginInfo).then((selectedUser) => {
                req.session._id = selectedUser.id;
                req.session._name = selectedUser.name;  
                res.sendStatus(201);
        }).catch(()=>{
            res.sendStatus(400);
        });
    },
    kakaoLogin: (req, res) => {
        const code = req.query.code;
        /* data : token value  */
        service.getKakaoToken(code).then(async (data) => {
            await service.getUserInfo(data).then((returnData) => {
                const userInfo = JSON.parse(returnData);
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
                    res.status(409);
                }
            });
            res.render('index',{session : req.session._id});    
        });
        
    },
    naverLogin: (req, res) => {
        const code = req.query.code;
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
                    res.status(409);
                }
            });
            res.render('index',{session : req.session._id});
        });   
    }
};
