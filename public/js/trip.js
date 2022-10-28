
/* DOM */
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

const shoppingBtns = document.querySelectorAll(".shopping-btn");
shoppingBtns.forEach((shoppingBtn)=>{
    shoppingBtn.addEventListener("click",(e)=>{
        const tourIdx = e.target.value;
        $.ajax({
                    method : "post",
                    url : `/play/shopping/${tourIdx}`,
                    success : (result)=>{
                        if(result === "fail"){
                            alert("로그인이 필요합니다");
                            window.location.href= "/users/login";
                        }else if(result === "exist"){
                            $(".pop-up #modal-text").text("이미 담긴 낭만입니다");
                        }
                        else{
                            $(".pop-up #modal-text").text("낭만이 담겼습니다");
                        }
                          
                    }
                }).then(()=>{
                    $(".pop-up").fadeIn();
                    $(".pop-up").addClass("black");
                    setTimeout(()=>{
                        $(".pop-up").removeClass("black");
                        $(".pop-up").fadeOut({duration:300});
                    },1500)
                })
    });
})


// shoppingBtn.addEventListener("click",(e)=>{
    
//     const data = {

//     }
//     $.ajax({
//         method : "post",
//         url : "play/shopping/1",
//         success : ()=>{

//         }
//     })
// })