const request = require('request');
const db = require('../config/db');
const service = require('../services/userService');

module.exports = {
    getMain: (req, res) => {
        res.render("../views/users/main.ejs",{session : req.session._id});
    },
    getLogin: (req,res) =>{
        if(req.session._id==undefined)
            res.render("../views/users/login.ejs",{session : req.session._id})      
        else{
            res.status(409).send("<script>alert('이미 로그인 중입니다');history.go(-1);</script>")
        }
    },
    postLogout:(req,res)=>{
        /* 카카오 세션 존재 시 카카오 서버~ 없을 시 세션만 삭제 */
        if(req.session._kakao){
            const logoutURL = `https://kauth.kakao.com/oauth/logout?client_id=457bc0baab39156996248d5b7386f600&logout_redirect_uri=http://localhost:5001`;
            request.get({
                url : logoutURL},
                    function (err,result,body){
                        req.session.destroy((err)=>{
                            if(err) throw(err);
                            else {
                                res.send("success");
                            }
                        });
                    
                    }
                );
        }else{
            req.session.destroy((err)=>{
                if(err) throw(err);
                else{
                    res.send("success");
                }
            })
        }
        

            
        
        
    },
    postRegister: (req, res) => {
        const userDto = {
            id: req.body.id,
            pw: req.body.pw,
            name: req.body.name,
            email: req.body.email,
        };
        service.register(userDto);
        res.status(201);
        res.redirect("/users/login");
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
        service.validator(userDto).then(function (data){
            res.send(data);
        }).catch(()=>{
            res.status(409);
        });
    },
    getUpdate: (req, res) => {
        console.log(req.query.idx);
        const sql = "SELECT * FROM member WHERE m_id = " + req.query.idx + ";";
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
            if (err) console.error(err);
        });
        db.query(updateSql, (err) => {
            if (err) console.error(err);
        });
    },
};
