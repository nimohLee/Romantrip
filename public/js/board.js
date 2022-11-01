/* boardDetail js */
function updateBoard(idx) {
    const frmPop = document.frmPopup;
    const url = "../update/" + idx;
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
    const writeData = {
        title : document.querySelector("#write-title").value,
        content : document.querySelector("#write-content").value
    }
    
    /* set display flex hidden progress bar */
    const progressBar = document.querySelector("#progress-bar");
    progressBar.className = "display-flex";

    $.ajax({
        method : "post",
        contentType : "application/json",
        url : "./writeProc",
        data : JSON.stringify(writeData)
    }).then((res)=>{
        console.log(res);
        progressBar.className = "display-none";
        if(res === "success"){
            location.href = "/board/page/1";
        }
    }).catch((res)=>{   
        alert(res.responseText);
    });
}