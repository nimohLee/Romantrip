const readMoreBtns = document.querySelectorAll(".read-more-btn");

readMoreBtns.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        for(let i = 0; i < readMoreBtns.length; i++){
            if(btn.id == `content-btn[${i}]`){
                document.getElementById(`content-desc[${i}]`).classList.toggle("detail-closed");
                if(btn.innerText === "더보기"){
    
                    btn.innerText = "숨기기";
                }else 
                    btn.innerText = "더보기";
            }
        }
        if(btn.id === 0){

        }
        console.log(btn.id)
    })
    
})
