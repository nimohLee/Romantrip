const service = require('../services/tourService');

module.exports = {
    getMainPage : (req,res) =>{
        res.render("../views/eat/index",{session : req.session._id});
    },
    getRestaurantPage : async (req,res) =>{
        const restaurantResult = await service.selectAllTourList("restaurant");
        res.render("../views/eat/restaurant",{session : req.session._id, result : restaurantResult});
    },
    getCafePage : async (req,res) =>{
        const cafeResult = await service.selectAllTourList("cafe");
        res.render("../views/eat/cafe",{session : req.session._id,result: cafeResult});
    },
    getMarketPage : async (req,res) =>{
        const marketResult = await service.selectAllTourList("market");
        res.render("../views/eat/market",{session : req.session._id, result:marketResult});
    }
}