/* HTML , CSS , JAVASCRIPT 모두 load 완료 시 progress-bar 숨기기 */
window.onload = function () {
    // document.querySelector("#progress-bar").className = "display-none";
};

const menus = document.querySelectorAll(".main-menu li");
const subMenu = document.querySelector(".sub-menu");
const playMenu = document.querySelector(".play-sub-menu");
const eatMenu = document.querySelector(".eat-sub-menu");
const main = document.querySelector("main");
const subCategoryWraps = document.querySelectorAll(".sub-category-wrap");
const showMenuBtn = document.querySelector("#bars-btn");

function openMenu(currentMenu, anotherMenu) {
    subMenu.classList.add("menu-block");
    currentMenu.classList.add("selected-sub-menu");
    anotherMenu.classList.remove("selected-sub-menu");
    main.classList.add("menu-opened");
}

function closeMenu() {
    subMenu.classList.remove("menu-block");
    main.classList.remove("menu-opened");
}

/* 화면 너비가 900px 이상일 때 */
menus.forEach((menu) => {
    menu.addEventListener("mouseenter", (e) => {
        const menuName = e.target.innerText;
        if (window.innerWidth > 900) {
            if (menuName === "게시판") {
                closeMenu();
            } else if (menuName === "즐길거리") {
                openMenu(playMenu, eatMenu);
            } else if (menuName === "먹거리") {
                openMenu(eatMenu, playMenu);
            }
        }
    });
});

/* 마우스가 일정화면 높이밑으로 내려갈 경우 메뉴 닫기 */
document.addEventListener("mousemove", (event) => {
    if (convertPXToVH(event.clientY) > 45) {
        closeMenu();
    }
});

/* 창이 resize될 때 1023px 밑으로 내려갈 경우 열려있던 메뉴 숨기고 반응형 웹 */
window.addEventListener("resize", () => {
    if (window.innerWidth < 1023) {
        subMenu.classList.remove("menu-block");
    }
});

let isSubMenuOpened = false;

showMenuBtn.addEventListener("click", (e) => {
    if (isSubMenuOpened) {
        document
            .querySelector(".header-center")
            .classList.remove("show-sub-menu-right");
        document
            .querySelector(".header-center")
            .classList.add("hide-sub-menu-right");
        document
            .querySelector(".header-right")
            .classList.add("hide-sub-menu-right");
        document
            .querySelector(".header-right")
            .classList.remove("show-sub-menu-right");
        isSubMenuOpened = false;
    } else {
        document
            .querySelector(".header-center")
            .classList.remove("hide-sub-menu-right");
        document
            .querySelector(".header-center")
            .classList.add("show-sub-menu-right");
        document
            .querySelector(".header-right")
            .classList.add("show-sub-menu-right");
        document
            .querySelector(".header-right")
            .classList.remove("hide-sub-menu-right");
        isSubMenuOpened = true;
    }
});

/* pixel to vh function */
function convertPXToVH(px) {
    return px * (100 / document.documentElement.clientHeight);
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
                    location.href = "/";
            },
            fail: (result)=>{
                console.log(result);
                alert("로그아웃에 실패했습니다. 잠시 후 다시 시도해주세요")
            }
        });
}