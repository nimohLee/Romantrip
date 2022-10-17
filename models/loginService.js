const request = require('request');
const REST_API_KEY = "457bc0baab39156996248d5b7386f600";
const REDIRECT_URI = "http://localhost:5001/login/kakao";

module.exports = {
    auth : (code)=>{
        return new Promise((resolve,reject)=>{
            let response;
            request.post(
                `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
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
    getUserInfo : async (access_token) => {
        
        request.get({
            uri: 'http://kapi.kakao.com',
            headers : {
                Authorization: `Bearer ${access_token}`
            }
        },function(err,res,body){
            console.log(body);
        }
        )
        
    }
    
}