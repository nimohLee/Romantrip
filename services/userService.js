const { User } = require("../database/models/index");
const bcryptService = require("../services/bcryptService");
require("dotenv").config;

module.exports = {
    getId : async () =>{

    },
    register: async (params) => {
        const encodedPw = bcryptService.hashingPassword(params.pw);
        try {
            await User.create({
                name: params.name,
                id: params.id,
                pw: encodedPw,
                email: params.email,
                regDate: new Date(),
            });
        } catch (err) {
            throw err;
        }
    },
    validator: (params) => {
        return new Promise(async (resolve, reject) => {
            const result = await User.findAll({
                where: {
                    id: params.id,
                },
                raw: true,
            });
            if (result[0]) {
                resolve("No");
            } else resolve("Yes");
        });
    },
    validation: (info) => {
        return new Promise(async (resolve, reject) => {
            try {
                const selectUser = await User.findOne({
                    where: {
                        id: info.id,
                    },
                    raw: true,
                });
                const pwCompareResult = bcryptService.comparePassword(
                    selectUser.pw,
                    info.pw
                );
                if (selectUser && pwCompareResult) {
                    resolve(selectUser);
                } else reject("fail");
            } catch (err) {
                reject("fail");
            }
        });
    },
    kakaoLogin : async (code) => {
        const baseUrl = "https://kauth.kakao.com/oauth/token";
        const config = {
          client_id: process.env.KAKAO_API,
          grant_type: "authorization_code",
          redirect_uri: "http://localhost:5001/users/kakao/callback",
          code,
        };
        const params = new URLSearchParams(config).toString();
        const finalUrl = `${baseUrl}?${params}`;
        const kakaoTokenRequest = await (
            await fetch(finalUrl, {
              method: "POST",
              headers: {
                "Content-type": "application/json", 
              },
            })
          ).json();
        if ("access_token" in kakaoTokenRequest) {
            // 엑세스 토큰이 있는 경우 API에 접근
            const { access_token } = kakaoTokenRequest;
            const userRequest = await (
              await fetch("https://kapi.kakao.com/v2/user/me", {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                  "Content-type": "application/json",
                },
              })
            ).json();

            let snsUser = await User.findOne({
                raw:true,
                where:{
                    sns_id : userRequest.id
                }
            });
            if(!snsUser){   
                try {
                    snsUser = await User.create({
                            name: userRequest.properties.nickname,
                            sns_id: userRequest.id,
                            regDate: new Date(),
                            provider: 'kakao'
                    });
                    snsUser = snsUser.dataValues;   
                } catch (err) {
                    throw err;
                }
            }
            const result = {
                snsUser : snsUser.m_id,
                token : access_token,
            };

            return result;
          } 
          
    },
    kakaoLogout : async (token) => {
          await fetch(`https://kapi.kakao.com/v1/user/logout`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
          })
        return ;
    }
};