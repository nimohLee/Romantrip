const service = require('../models/playService');

module.exports = {
    getMainPage : (req,res) =>{
        res.render("../views/play/index",{session : req.session._id});
    },
    getSightseeingPage : async (req,res) =>{
        const sightseeingResult = await service.selectAllTourList("sightseeing");
        res.render("../views/play/sightseeing",{session : req.session._id, result : sightseeingResult});
    },
    getAmusementPage : async (req,res) =>{
        const amusementResult = await service.selectAllTourList("amusement"); 
        res.render("../views/play/amusement",{session : req.session._id, result : amusementResult});
    },
    getLeisurePage : async (req,res) =>{
        const leisureResult = await service.selectAllTourList("leisure");
        res.render("../views/play/leisure",{session : req.session._id, result : leisureResult});
    },
    postShopping : async (req,res)=>{
        const shoppedIdx = req.params.idx;
        const tourListSession = req.session._tourList;
        const isExist = service.checkExistTourList(tourListSession,shoppedIdx);
        console.log(service.checkExistTourList(tourListSession,shoppedIdx));
        if(req.session._id){
            if(isExist){
                res.send("exist");
            }else{
                if(tourListSession)
                    tourListSession.push(shoppedIdx);
                else{
                    req.session._tourList = [];
                    req.session._tourList.push(shoppedIdx);
                }
                res.send("success");
            }
            
            
        }else{
            res.send("fail");
        }
        console.log(req.session._tourList);
    }
}