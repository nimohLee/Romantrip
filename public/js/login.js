/* DOM */
document.title = "RomanTrip>login";


/* SNS 로그인 */
/* 카카오 */
function kakaoAuthorization() {
    const REST_API_KEY = "457bc0baab39156996248d5b7386f600";
    const REDIRECT_URI = "http://localhost:5001/login/kakao";
    Kakao.init(REST_API_KEY);
    Kakao.Auth.authorize({
        redirectUri: REDIRECT_URI,
    });
}

/* 네이버 */
function naverAuthorization() {
    const reqParams = {
        client_id: "_MITzC_aLNm1ne3NkL3o",
        redirect_uri: "http://localhost:5001/login/naver",
    };
    location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${reqParams.client_id}&redirect_uri=${reqParams.redirect_uri}&state=test`;
}

/* 로그아웃 */
function logout() {
    /* express 서버에서 처리하기 위해 post 요청 */
  
        $.ajax({
            method: "post",
            async: true,
            url: "/users/logout",
            data: "",
            success: (result) => {
                if (result === "success") {
                    location.href = "/";
                }
            },
        });
    
}

function submitLoginForm() {
    const loginForm = document.forms.loginFrm;
    const formData = {
        id: loginForm.id.value,
        pw: loginForm.pw.value,
    };
    $.ajax({
        method: "post",
        url: "/login/basic",
        data: formData,
        dataType: "json",
    }).then((result)=>{
            /* 이전 주소가 회원가입 주소이면 홈화면으로, 아니면 이전 화면으로 */
            if(document.referrer === "http://localhost:5001/users/register"){ // 배포 시 로컬호스트 손봐주기
                location.href = "/";
            }
            else
                location.href = document.referrer; // 새로고침되면서 이전페이지로 이동
        
    }).catch(()=>{
        alert("아이디 또는 비밀번호를 확인하세요");
            /* 로그인 폼 초기화 및 포커싱 */
            loginForm.id.value = "";
            loginForm.pw.value = "";
            loginForm.id.focus();
    });
}
