const request = require('request');
const db = require('../config/db');
const model = require('../models/userService');
const service = require('../models/loginService');
const session = require('express-session');
module.exports = {
    getMain: (req, res) => {
        res.render("../views/users/main.ejs",{session : req.session._id});
    },
    getLogin: (req,res) =>{
        res.render("../views/users/login.ejs",{session : req.session._id})  
    },
    postLogout:(req,res)=>{
        const logoutURL = `https://kauth.kakao.com/oauth/logout?client_id=457bc0baab39156996248d5b7386f600&logout_redirect_uri=http://localhost:5001/login/logout`;
        const logURL = `https://kapi.kakao.com/v1/user/logout?target_id_type=user_id&target_id=${req.session._id}`;
        const token = req.session._token;
        request.get({
            url : logoutURL},
                function (err,res,body){
                    req.session.destroy((err)=>{
                        if(err) throw(err)
                        else{
                        }
                    });
                }
            );

            
        
        
    },
    postRegister: (req, res) => {
        const userDto = {
            id: req.body.id,
            pw: req.body.pw,
            name: req.body.name,
            email: req.body.email,
        };
        model.register(userDto);
        res.redirect("/",{session : req.session._id});
    },
    getRegister: (req, res) => {
        res.render("../views/users/register",{session : req.session._id});
    },
    validation: async (req, res) => {
        const userDto = {
            id: req.body.id,
            pw: req.body.pw,
            name: req.body.name,
            email: req.body.email,
        };
        model.validator(userDto).then(function (data){
            res.send(data);
        });
    },
    getUpdate: (req, res) => {
        console.log(req.query.idx);
        const sql = "SELECT * FROM member WHERE m_id = " + req.query.idx + ";";
        console.log(sql);
        db.query(sql, (err, result) => {
            if (err) throw err;
            else {
                res.render("../views/users/update", { result , session : req.session._id});
            }
        });
    },
    postUpdate: (req, res) => {
        const user = {
            idx: req.body.idx,
            id: req.body.id,
            pw: req.body.pw,
            name: req.body.name,
            email: req.body.email,
        };

        const sql =
            "UPDATE member SET id = ?, pw = ?, name = ?, email = ? WHERE m_id = ?;";

        db.query(
            sql,
            [user.id, user.pw, user.name, user.email, user.idx],
            (err) => {
                if (err) throw err;
            }
        );
    },
    postDelete: (req, res) => {
        const deleteSql = "DELETE FROM member WHERE m_id = " + req.body.idx;
        const updateSql =
            "UPDATE member SET m_id = m_id-1 WHERE m_id > " + req.body.idx;

        db.query(deleteSql, (err) => {
            if (err) throw err;
        });
        db.query(updateSql, (err) => {
            if (err) throw err;
        });
    },
};
