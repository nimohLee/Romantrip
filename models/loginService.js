const request = require('request');
const REST_API_KEY = "457bc0baab39156996248d5b7386f600";
const REDIRECT_URI = "http://localhost:5001/snsLogin/kakao";

module.exports = {
    auth : (code)=>{
        return new Promise((resolve,reject)=>{
            let response;
            request.post(
                `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
                function(error, res, body){
                    if(!error && res.statusCode == 200){
                        response = JSON.parse(body);
                        console.log(response.access_token);
                        resolve(response.access_token);
                    }else{
                        console.log(error);
                    }
                }
            );
        })
    }
}