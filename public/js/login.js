/* DOM */

document.title = "RomanTrip>login";

$("#loginFrm").keypress(function (e) {
    if (e.keyCode === 13){
        submitLoginForm();
    }
});

function submitLoginForm() {
    const loginForm = document.forms.loginFrm;
    const formData = {
        id: loginForm.id.value,
        pw: loginForm.pw.value,
    };
    if (!formData.id || !formData.pw){
        alert("아이디 및 비밀번호를 입력해주세요");
    }else{
        $.ajax({
            method: "post",
            url: "/users/login",
            data: formData,
            success: () => {
                /* 이전 주소가 회원가입 주소이면 홈화면으로, 아니면 이전 화면으로 */
                if (document.referrer === "http://nimoh.shop/users/register"||document.referrer === "http://www.nimoh.shop/users/register") {
                    location.href = "/";
                } else location.href = document.referrer; // 새로고침되면서 이전페이지로 이동
            },
            error: () => {
                alert("아이디 또는 비밀번호를 확인하세요");
                /* 로그인 폼 초기화 및 포커싱 */
                loginForm.id.value = "";
                loginForm.pw.value = "";
                loginForm.id.focus();
            },
        });
    }
    return false;
}
