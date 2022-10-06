/* boardDetail js */
function updateBoard(idx) {
    const frmPop = document.frmPopup;
    const url = "./update/" + idx;
    const name = "update board";
    const option = "width = 300, height = 300, top = 100, left = 200";
    const popup = window.open(url, "_blank", option);
    popup.addEventListener("beforeunload", function () {
        location.reload();
    });
}
function deleteBoard(idx) {
    if (confirm("삭제하시겠습니까?")) {
        $.ajax({
            method: "post",
            url: "./deleteProc",
            contentType: "application/json",
            data: JSON.stringify({ idx }),
        });
        location.href = "../page/1";
    }
}

/* boardUpdate js */
function onConfirm() {
    if (confirm("수정하시겠습니까?")) {
        document.updateFrm.submit();
    }
    setTimeout(() => {
        window.close();
    }, 1);
}
function closeForm() {
    if (confirm("수정을 취소하시겠습니까?")) window.close();
}

/* boardWrite js */
function toSubmit(){
    const frm = document.writeForm;
    const title = writeForm.title.value;
    const writer = writeForm.writer.value;
    const content = writeForm.content.value;
    console.log(title);
    if(title==""||writer==""||content==""){
        alert("모두 작성해야합니다. 작성을 완료해주세요");
    }
    else{
        frm.submit();
    }
}