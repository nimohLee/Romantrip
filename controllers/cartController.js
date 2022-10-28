const service = require("../models/cartService");

module.exports = {
    getCartMainPage : async (req,res)=>{
        const sessionID = req.session._id;
        if(sessionID === undefined){
            res.send("<script>alert('로그인이 필요합니다'); location.href = '/users/login'</script>")
        }
        else {
            await service.getCartList(sessionID).then((selectResult)=>{
            
            res.render("../views/cart/index",{session : req.session._id, result : selectResult});
        })
    }
        
    },
    deleteCartList : async (req, res)=>{
        const params = {
            sessionID : req.session._id,
            tlID : req.body.idx
        };
        await service.deleteList(params).then((result)=>{
            res.status(200).send(result);
        });
    }
}