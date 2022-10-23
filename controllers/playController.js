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
    }
}