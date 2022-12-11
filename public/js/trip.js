/* DOM */
const readMoreBtns = document.querySelectorAll(".read-more-btn");
const readMoreCloseBtns = document.querySelectorAll(".close-detail-btn");
const detailBox = document.querySelectorAll(".tour-card-detail");

for (let i = 0; i < readMoreBtns.length; i++) {
    readMoreBtns[i].addEventListener("click", (e) => {
        if (readMoreBtns[i].id === `content-btn[${i}]`) {
            detailBox[i].classList.add("show-detail");
            detailBox[i].classList.remove("close-detail");
        }
    });
    readMoreCloseBtns[i].addEventListener("click", (e) => {
        detailBox[i].classList.add("close-detail");
        detailBox[i].classList.remove("show-detail");
    });
}

const shoppingBtns = document.querySelectorAll(".shopping-btn");
shoppingBtns.forEach((shoppingBtn) => {
    shoppingBtn.addEventListener("click", (e) => {
        const tourIdx = e.target.value;
        $.ajax({
            method: "post",
            url: `/play/shopping/${tourIdx}`,
        })
            .then(() => {
                showModal("낭만이 담겼습니다");
            })
            .catch((result) => {
                if (result.status === 401) {
                    alert("로그인이 필요합니다");
                    window.location.href = "/users/login";
                } else if (result.status === 409) {
                    showModal("이미 담긴 낭만입니다");
                }
            });
    });
});

function showModal(text) {
    $(".pop-up #modal-text").text(text);
    $(".pop-up").fadeIn();
    $(".pop-up").addClass("black");
    setTimeout(() => {
        $(".pop-up").removeClass("black");
        $(".pop-up").fadeOut({ duration: 300 });
    }, 1500);
}
