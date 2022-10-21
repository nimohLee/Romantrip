module.exports = {
    getMain : (req,res) =>{
        res.render("../views/play/index",{session : req.session._id});
    },
    getSightseeing : (req,res) =>{
        res.render("../views/play/sightseeing",{session : req.session._id});
    },
    getRelax : (req,res) =>{
        res.render("../views/play/relax",{session : req.session._id});
    },
    getAmusement : (req,res) =>{
        res.render("../views/play/amusement",{session : req.session._id});
    },
    getLeisure : (req,res) =>{
        res.render("../views/play/leisure",{session : req.session._id});
    }
}