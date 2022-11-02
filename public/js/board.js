/* list.ejs */
function paging(clickedPageNum){

    $.ajax({
        method : "get",
        url : "/board/main",
        data : {clickedPageNum}
    }
    ).then((data)=>{
        document.querySelector("#board-main").innerHTML = data;
    }).catch(()=>{
        alert("잘못된 접근입니다.");
    });

}




/* boardDetail js */
function updateBoardPage(idx) {
    $.ajax({
        method : "get",
        url : "/board/update/"+idx
    })

}
function deleteBoard(idx) {
    if (confirm("삭제하시겠습니까?")) {
        $.ajax({
            method: "post",
            url: "/board/detail/deleteProc",
            contentType: "application/json",
            data: JSON.stringify({ idx }),
        }).then(()=>{
            alert("삭제되었습니다.");
            location.href = "/board/main"
        }).catch((res)=>{
            if(res.status === 401){
                alert("로그인이 필요합니다");
            }else if(res.status === 403){
                alert("글쓴이만 삭제할 수 있습니다")
            }
            
        });
        
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
function toWriteSubmit(){
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
            location.href = "/board/main";
        }
    }).catch((res)=>{   
        alert(res.responseText);
    });
}

/* update.ejs */
function toUpdateSubmit(updateBoardIdx){
    const updateDto = {
        title : document.querySelector("#update-title").value,
        content : document.querySelector("#update-content").value
    };
    $.ajax({
        method : "post",
        url : "/board/update/"+updateBoardIdx,
        contentType : "application/json",
        data : JSON.stringify(updateDto)
    }).then((result)=>{
        if(result === "success"){
            /* 수정이 완료되었습니다 띄우고 */
            location.href = document.referrer;
        }else{
            alert("잘못된 접근입니다.");
        }
           
    });
    
}