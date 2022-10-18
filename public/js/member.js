/* memberList js */
function updateUser(idx) {
    const frmPop = document.frmPopup;
    const url = "../update?idx=" + idx;
    const name = "update user";
    const option = "width = 300, height = 300, top = 100, left = 200";
    const popup = window.open(url, "_blank", option);
    popup.addEventListener("beforeunload", function () {
        location.reload();
    });
}
function deleteUser(idx) {
    if (confirm("삭제하시겠습니까?")) {
        console.log("네");
        $.ajax({
            method: "post",
            url: "../../deleteProc",
            contentType: "application/json",
            data: JSON.stringify({ idx }),
        });
        location.reload();
    }
}

/* updatePopup js */
const { regExpID, regExpName } = require("/js/register");
function submitFrm() {
    const frm = document.updateFrm;
    console.log(frm);
    frm.submit();
}
function showConfirm() {
    if (confirm("수정하시겠습니까?")) {
        submitFrm();
        /* submitFrm에서 post 요청보다 window.close()가 먼저 실행됨.
          setTimeout으로 submitFrm 먼저 실행 */
        alert("수정이 완료되었습니다.");
        setTimeout(() => {
            window.close();
        }, 1);
    } else {
        window.close();
    }
}