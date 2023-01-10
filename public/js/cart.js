/* DOM */
document.title = "RomantTrip > cart";
const btnWrap = document.querySelectorAll(".btn-wrap");
const removeBtn = document.querySelectorAll(".remove-btn");
const deleteSpan = document.querySelectorAll(".delete-span");
const popUp = document.querySelector(".pop-up");

function changeBtnWrap(i, param1, param2) {
    deleteSpan[i].classList.add(param1);
    deleteSpan[i].classList.remove(param2);
    removeBtn[i].classList.add(param2);
    removeBtn[i].classList.remove(param1);
}

for (let i = 0; i < btnWrap.length; i++) {
    btnWrap[i].addEventListener("mouseenter", () => {
        btnWrap[i].classList.add("btn-hover");
        btnWrap[i].classList.remove("btn-hover-out");
        changeBtnWrap(i, "show", "hidden");
    });

    btnWrap[i].addEventListener("mouseleave", () => {
        btnWrap[i].classList.remove("btn-hover");
        btnWrap[i].classList.add("btn-hover-out");
        changeBtnWrap(i, "hidden", "show");
    });

    /* delete CartList */
    btnWrap[i].addEventListener("click", (e) => {
        $("#pop-up-cart").fadeIn();
        $("#pop-up-cart").addClass("black");
        $("#btn-wrap button").click(function (e) {
            if (e.target.id === "cancel-btn") {
                $("#pop-up-cart").removeClass("black");
                $("#pop-up-cart").fadeOut({ duration: 150 });
            } else {
                /* ejs result값을 받아오기 위해 id값으로 임시 지정 */
                /* e.target.id 하면 못 불러오는 경우도 있기때문에 사용 X */
                const idx = btnWrap[i].id;
                $.ajax({
                    method: "delete",
                    url: "/cart/list",
                    data: { idx: idx }, // DB에서 tc_id 값은 1부터 시작하므로 +1
                }).then((result) => {
                    if (result === "success") {
                        alert("성공적으로 삭제되었습니다.");
                        location.href = "/cart";
                    }
                });
            }
        });
    });
}

$(this).parent().fadeOut();
