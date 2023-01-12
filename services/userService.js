const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { User } = require("../database/models/index");
const bcryptService = require("../services/bcryptService");
require("dotenv").config;

module.exports = {
    /**
     * 
     * @param {Object} registerDto 회원가입 정보
     */
    register: async (registerDto) => {
        const encodedPw = bcryptService.hashingPassword(registerDto.pw);
        try {
            await User.create({
                name: registerDto.name,
                id: registerDto.id,
                pw: encodedPw,
                email: registerDto.email,
                regDate: new Date(),
            });
        } catch (err) {
            throw err;
        }
    },
    /**
     * 
     * @param {Object} userDto 
     * @returns 
     */
    validator: (userDto) => {
        return new Promise(async (resolve, reject) => {
            const result = await User.findAll({
                where: {
                    id: userDto.id,
                },
                raw: true,
            });
            if (result[0]) {
                resolve("No");
            } else resolve("Yes");
        });
    },
    /**
     * 
     * @param {Object} loginDto 로그인 정보 DTO
     * @returns 
     */
    validation: (loginDto) => {
        return new Promise(async (resolve, reject) => {
            try {
                const selectUser = await User.findOne({
                    where: {
                        id: loginDto.id,
                    },
                    raw: true,
                });
                const pwCompareResult = bcryptService.comparePassword(
                    selectUser.pw,
                    loginDto.pw
                );
                if (selectUser && pwCompareResult) {
                    resolve(selectUser);
                } else reject("fail");
            } catch (err) {
                reject("fail");
            }
        });
    },
    /**
     * 
     * @param {String} code 카카오 로그인 시 콜백받은 code
     * @returns 
     */
    kakaoLogin: async (code) => {
        const baseUrl = "https://kauth.kakao.com/oauth/token";
        const config = {
            client_id: process.env.KAKAO_API,
            grant_type: "authorization_code",
            redirect_uri: `${process.env.REDIRECT_URI}/users/kakao/callback`,
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
                raw: true,
                where: {
                    sns_id: userRequest.id,
                },
            });

            if (!snsUser) {
                try {
                    snsUser = await User.create({
                        name: userRequest.properties.nickname,
                        sns_id: userRequest.id,
                        regDate: new Date(),
                        provider: "kakao",
                    });
                    snsUser = snsUser.dataValues;
                } catch (err) {
                    throw err;
                }
            }

            const result = {
                snsUser: snsUser.m_id,
                token: access_token,
            };
            return result;
        }else{
            throw new Error("카카오 API 연동에 실패하였습니다.");
        }
    },

    /**
     * 
     * @param {String} token 카카오 로그인 토큰
     * @returns 
     */
    kakaoLogout: async (token) => {
        await fetch(`https://kapi.kakao.com/v1/user/logout`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return;
    },
    getNaverLoginUrl: () => {
        const baseUrl = `https://nid.naver.com/oauth2.0/authorize`;
        const config = {
            response_type: "code",
            client_id: process.env.NAVER_API,
            redirect_uri: encodeURI(
                `${process.env.REDIRECT_URI}/users/naver/callback`
            ),
            state: "test",
        };
        const params = new URLSearchParams(config).toString();
        const finalUrl = `${baseUrl}?${params}`;

        return finalUrl;
    },
    /**
     * 
     * @param {String} code 네이버 API 로그인 콜백 시 받은 코드
     * @param {String} state 네이버 API에 사용자 식별을 위한 임의의 문자열
     * @returns 
     */
    fetchNaverLogin: async (code,state)=>{
        const baseUrl = `https://nid.naver.com/oauth2.0/token`;
        const config = {
            grant_type:"authorization_code",
            client_id: process.env.NAVER_API,
            client_secret: process.env.NAVER_SECRET,
            code,
            state
        }

        const params = new URLSearchParams(config).toString();
        const finalUrl = `${baseUrl}?${params}`;

        const response = await (await fetch(finalUrl)).json();
        const accessToken = response.access_token;
        const refreshToken = response.refresh_token;
        
        if(accessToken){
            const userRequest = await (
                await fetch("https://openapi.naver.com/v1/nid/me", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                })
            ).json();
            const userData = userRequest?.response;

            let snsUser = await User.findOne({
                raw: true,
                where: {
                    sns_id: userData.id,
                },
            });
            if (!snsUser) {
                try {
                    snsUser = await User.create({
                        name: userData.name,
                        sns_id: userData.id,
                        regDate: new Date(),
                        provider: "naver",
                    });
                    snsUser = snsUser.dataValues;
                } catch (err) {
                    throw err;
                }
            }
            const result = {
                snsUser: snsUser.m_id,
                accessToken,
                refreshToken
            };
            return result;
        }else{
            throw new Error("네이버 API 연동에 문제가 발생하였습니다.");
        }
        
    }
};
