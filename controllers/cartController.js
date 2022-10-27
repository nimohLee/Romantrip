const service = require("../models/cartService");

module.exports = {
    getCartMainPage : async (req,res)=>{
        const sessionID = req.session._id;
        if(sessionID === undefined){
            res.send("<script>alert('로그인이 필요합니다'); location.href = '/users/login'</script>")
        }
        else {
            await service.getCartList(sessionID).then((selectResult)=>{
            console.log(selectResult);
            res.render("../views/cart/index",{session : req.session._id, result : selectResult});
        })
    }
        
    }
}