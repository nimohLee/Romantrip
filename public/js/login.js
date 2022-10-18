/* SNS 로그인 */
/* 카카오 */
const REST_API_KEY = "457bc0baab39156996248d5b7386f600";
const REDIRECT_URI = "http://localhost:5001/login/kakao";
Kakao.init(REST_API_KEY);
console.log(Kakao.isInitialized());
function kakaoAuthorization() {
    Kakao.Auth.authorize({
        redirectUri: REDIRECT_URI,
    });
}

/* 네이버 */
function naverAuthorization(){
    const reqParams = {
        client_id : "_MITzC_aLNm1ne3NkL3o",
        redirect_uri : "http://localhost:5001/login/naver",
    };
    location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${reqParams.client_id}&redirect_uri=${reqParams.redirect_uri}&state=test`
}
 

   
/* 로그아웃 */
function logout(){
    if(confirm("로그아웃 하시겠습니까?")){
        $.ajax({
            method : "post",
            url : "/users/logout",
            success : (result)=>{
                if(result === "success"){
                    location.href = "/";
                }
            }
          });
    }


}