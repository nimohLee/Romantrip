module.exports = {
    getMain : (req,res) =>{
        res.render("../views/eat/index",{session : req.session._id});
    },
    getRestaurant : (req,res) =>{
        res.render("../views/eat/restaurant",{session : req.session._id});
    },
    getCafe : (req,res) =>{
        res.render("../views/eat/cafe",{session : req.session._id});
    },
    getMarket : (req,res) =>{
        res.render("../views/eat/market",{session : req.session._id});
    }
}