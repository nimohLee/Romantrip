"use strict";

// declare auth
const uName = document.getElementById("name");
const uID = document.getElementById("id");
const uPW = document.getElementById("pw");
const email = document.getElementById("email");

// declare isInput(boolean)
let nameOK = false;
let idOK = false;
let pwOK = false;
let emailOK = false;
let isSecond = false;

// 중복확인 버튼 클릭 시 팝업 function
function popupOpen(url, nick, width, height) {
    if (idOK) {
        let screen = "";
        let left = (screen.availWidth - width) / 2;
        let top = (screen.availHeight - height) / 2;
        screen =
            "left=" +
            left +
            ", top=" +
            top +
            ", width=" +
            width +
            ", height=" +
            height;
        window.open(url, nick, screen);
        dupOK = true;
    } else {
        alert("아이디를 8자 이상 입력해주세요");
    }
}

uID.addEventListener("keyup", (e) => {
    if (regExpID(e.currentTarget.value)) {
        idOK = true;
    } else if (!regExpID(e.currentTarget.value)) {
        idOK = false;
    } else {
        idOK = false;
    }
});

// 유효성 검사 function
function validateCheck() {
    /* -------- 회원가입 폼 제출 시 초기 validate 출력  -------*/
    // Name
    if (regExpName(uName.value.trim())) {
        nameOK = successCheck(uName);
    } else if (uName.value.length == "") {
        nameOK = errorCheck(uName, "이름을 입력해주세요");
    } else {
        nameOK = errorCheck(uName, "이름에는 한글이름만 입력할 수 있습니다");
    }

    // ID
    if (regExpID(uID.value.trim())) {
        idOK = successCheck(uID);
    } else if (regExpID(uID.value.trim())) {
        idOK = errorCheck(
            uID,
            "아이디는 영어 소문자, 영어 대문자, 숫자 조합만 가능합니다"
        );
    } else {
        idOK = errorCheck(uID, "아이디를 8자 이상 11자 미만으로 입력해주세요");
    }

    //PW
    if (uPW.value.trim().length > 11) {
        pwOK = successCheck(uPW);
    } else {
        pwOK = errorCheck(uPW, "비밀번호는 12자 이상 입력해주세요");
    }

    /* 회원가입 폼 첫 제출 후 keyup에 따른 error or success 변화 */

    // Name
    uName.addEventListener("keyup", (e) => {
        if (regExpName(e.currentTarget.value)) {
            nameOK = successCheck(uName);
        } else if (e.currentTarget.value.length == "") {
            nameOK = errorCheck(uName, "이름을 입력해주세요");
        } else {
            nameOK = errorCheck(uName, "이름에는 글자만 입력할 수 있습니다");
        }
    });

    //ID
    uID.addEventListener("keyup", (e) => {
        if (regExpID(e.currentTarget.value)) {
            idOK = successCheck(uID);
        } else if (regExpID(e.currentTarget.value)) {
            idOK = errorCheck(
                uID,
                "아이디는 영어 소문자, 영어 대문자, 숫자 조합만 가능합니다"
            );
        } else {
            errorCheck(uID, "아이디를 6자 이상 입력해주세요");
        }
    });

    // PW
    uPW.addEventListener("keyup", (e) => {
        if (e.currentTarget.value.length > 11) {
            pwOK = successCheck(uPW);
        } else {
            pwOK = errorCheck(uPW, "비밀번호는 12자리 이상 입력해주세요");
        }
    });

    if (email.value === null || email.value == "") {
        emailOK = errorCheck(email, "이메일을 입력해주세요");
    } else if (!isEmail(email.value.trim())) {
        emailOK = errorCheck(email, "올바른 이메일 형식이 아닙니다.");
    } else {
        emailOK = successCheck(email);
    }

    //email validation
    email.addEventListener("keyup", (e) => {
        //currentTarger : 현재 이벤트 발생하는 target
        const val = e.currentTarget.value;
        //@ 체크
        //@ 뒤에 .있으면 true 없으면 false
        if (e.currentTarget.value === null || e.currentTarget.value == "") {
            emailOK = errorCheck(email, "이메일을 입력해주세요");
        } else if (!isEmail(val)) {
            emailOK = errorCheck(email, "올바른 이메일 형식이 아닙니다.");
        } else {
            emailOK = successCheck(email);
        }
    });
}

// Email 정규표현식 함수
function isEmail(value) {
    // 없으면 -1, 있으면 0 ~

    //value.split 공부하기

    return value.indexOf("@") > 1 && value.split("@")[1].indexOf(".") > 1;
}

// Name 정규표현식 함수 (영어 소문자, 대문자, 한글 (가~힣))
function regExpName(input) {
    let exp = /^[가-힣]{2,4}$/;

    return exp.test(input);
}

// ID 정규표현식 함수 (영어 소문자, 숫자 0~9 8자부터 11자)
function regExpID(input) {
    let exp = /([a-z0-9]){6,11}/;

    return exp.test(input);
}

// input border tomato로 설정
function errorCheck(input, msg) {
    let wrapInput = input.parentElement.parentElement;
    let small = wrapInput.querySelector("small");
    wrapInput.className = "wrap-input error";
    small.innerHTML = msg;
    return false;
}

function successCheck(input) {
    let wrapInput = input.parentElement.parentElement;
    wrapInput.className = "wrap-input success";
    return true;
}

function submitForm(){
    let isSuccessed = false;
    const jsObj = {
        id : uID.value,
        pw : uPW.value,
        name : uName.value,
        email : email.value
    }
    $.ajax({
        url: "./idVaild",
        method:"post",
        contentType: "application/json",
        async: false,
        data: JSON.stringify(jsObj),
        success: function(result){
            console.log(result);
            if( result == "No"){
                alert("사용할 수 없는 아이디입니다");
                isSuccessed = false;
            }else{
                isSuccessed = true;}
        }
    });
    return isSuccessed;
}

document.getElementById("frm").addEventListener("submit", (e) => {
    validateCheck();
    if (nameOK && idOK && pwOK && emailOK) {
        if(submitForm()){
            alert('회원가입이 완료되었습니다');
            location.href = "/member";
            return true;
        }else{
            e.preventDefault();
            return false;
        }
    } else {
        e.preventDefault();
        return false;
    }
});

// 페이지 로딩 천천히
document.addEventListener("DOMContentLoaded", () => {
    window.setTimeout(() => {
        document.body.classList.remove("fade");
    });
});


