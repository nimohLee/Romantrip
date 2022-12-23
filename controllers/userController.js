const request = require('request');
const db = require('../config/db');
const service = require('../services/userService');

module.exports = {
    getLogin: (req,res) =>{
        if(req.session._id==undefined)
            res.status(200).render("../views/users/login.ejs",{session : req.session._id})      
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
                                res.status(201).send("success");
                            }
                        });
                    
                    }
                );
        }else{
            req.session.destroy((err)=>{
                if(err) {
                    res.sendStatus(500);
                }
                else {
                    res.sendStatus(201);
                }
            })
        }
    },
    postRegister: async (req, res) => {
        if(req.body.id!==undefined && req.body.pw!==undefined && req.body.name !== undefined && req.body.email !==undefined){
            const userDto = {
                id: req.body.id,
                pw: req.body.pw,
                name: req.body.name,
                email: req.body.email,
            };
            try{
                await service.register(userDto);
                res.status(201).redirect("/users/login");
            }catch(err){
                res.sendStatus(500);
            }
        }else{
            res.sendStatus(400);
        }
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
            res.status(200).send(data);
        }).catch(()=>{
            res.sendStatus(409);
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
