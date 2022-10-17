/* SNS 로그인 */
/* 카카오 */
const REST_API_KEY = "457bc0baab39156996248d5b7386f600";
const REDIRECT_URI = "http://localhost:5001/snsLogin/kakao";
Kakao.init(REST_API_KEY);
console.log(Kakao.isInitialized());
function kakaoAuthorization() {
    
    Kakao.Auth.authorize({
        redirectUri: REDIRECT_URI,
    });
}
