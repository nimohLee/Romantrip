const { application } = require('express');
const axios = require('axios');
const request = require('request');
const kakaoKey = {
    client_id : "457bc0baab39156996248d5b7386f600",
    redirect_uri : "http://localhost:5001/login/kakao"
}
const naverKey = {
    client_id : "_MITzC_aLNm1ne3NkL3o",
    redirect_uri : "http://localhost:5001/login/naver",
    secret : "sL8N635zhm"
}
module.exports = {
    getKakaoToken : (code)=>{
        return new Promise((resolve,reject)=>{
            let response;
            request.post(
                `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${kakaoKey.client_id}&redirect_uri=${kakaoKey.redirect_uri}&code=${code}`,
                function(error, res, body){
                    if(!error && res.statusCode == 200){
                        response = JSON.parse(body);
                        resolve(response.access_token);
                    }else{
                        console.log(error);
                    }
                }
            );
        })
    },
    getNaverToken : (code)=>{
        let response;
        return new Promise((resolve,reject)=>{
            request.post(
                `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${naverKey.client_id}&client_secret=${naverKey.secret}&code=${code}&state=test`,
                function(error,res,body){
                    if(!error){
                        response = JSON.parse(body);
                        resolve(response.access_token);
                    }else{
                        console.log("실패");
                    }
                }
            )
        })
    }
    ,
    naverAuth: async ()=>{
        const reqParams = {
            client_id : "_MITzC_aLNm1ne3NkL3o",
            redirect_uri : "http://localhost:5001/login/naver",
            state : "test"
        };
        await axios.get(`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${reqParams.client_id}&redirect_uri=${reqParams.redirect_uri}&state=${reqParams.state}`);
    },
    getUserInfo : async (access_token) => {
        const header = {
            'Authorization' : `Bearer ${access_token}`,
            'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8'
        }

        return new Promise((resolve, reject)=>{
            request.post({
                url: 'https://kapi.kakao.com/v2/user/me',
                headers : header
            },function(err,res,body){
                resolve(body);
            }
            )
        })
    },
    naverGetUserInfo : async (access_token) => {
        const header = {
            'Authorization' : `Bearer ${access_token}`
        }

        return new Promise((resolve, reject)=>{
            request.post({
                url: 'https://openapi.naver.com/v1/nid/me',
                headers : header
            },function(err,res,body){
                resolve(body);
            }
            )
        })
    }
    
}