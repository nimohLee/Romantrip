const db = require('../config/db');
const model = require('../models/userService');
module.exports = {
    getMain: (req, res) => {
        res.render("../views/users/main.ejs");
    },
    postRegister: (req, res) => {
        const userDto = {
            id: req.body.id,
            pw: req.body.pw,
            name: req.body.name,
            email: req.body.email,
        };
        model.register(userDto);

        res.redirect("/");
    },
    getRegister: (req, res) => {
        res.render("../views/users/register");
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
        // const selectUserSql = `SELECT count(m_id) AS idCount FROM member WHERE id = "${user.id}";`;
        // db.query(selectUserSql, (err, result) => {
        //     if (err) throw err;
        //     else if (result[0].idCount > 0) {
        //         res.send("No");
        //     } else res.send("Yes");
        // });
    },
    getList: (req, res) => {
        const page = req.params.page;
        const selected = req.query.select;
        const searchTf = req.query.text;
        let sql;
        if (selected === undefined) {
            sql = "SELECT * FROM member ORDER BY m_id DESC";
        } else {
            sql =
                "SELECT * FROM member WHERE " +
                selected +
                "= '" +
                searchTf +
                "' ORDER BY m_id DESC;";
        }

        db.query(sql, (err, result) => {
            if (err) throw err;
            res.render("../views/users/list.ejs", {
                result: result,
                page: page,
                length: result.length - 1,
                page_num: 10,
                pass: true,
            });
        });
    },
    getUpdate: (req, res) => {
        console.log(req.query.idx);
        const sql = "SELECT * FROM member WHERE m_id = " + req.query.idx + ";";
        console.log(sql);
        db.query(sql, (err, result) => {
            if (err) throw err;
            else {
                res.render("../views/users/update", { result });
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
