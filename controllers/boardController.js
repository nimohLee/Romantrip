/* controller에서는  데이터 가공등 서비스 로직 X 
1. 컨트롤러는 들어오는 클라이언트 요청을 받고 서비스에 전달한다.
2. 서비스에서 작업을 마친 데이터를 받아 클라이언트에게 응답한다.
3. res, req는 controller에서만 control */

const db = require("../config/db");
const model = require("../models/boardService");
const { user, Board } = require("../database/models/index");

module.exports = {
    getMain: async (req, res) => {
        const params = {
            page: req.params.page,
            selected: req.query.select,
            searchTf: req.query.text,
        };
        model.getBoardList(params).then(function (data) {
            res.render("../views/board/list.ejs", {
                result: data,
                page: params.page,
                length: data.length - 1,
                page_num: 10,
                pass: true,
            });
        });
    },

    getWrite: (req, res) => {
        res.render("../views/board/write.ejs");
    },
    getDetail: (req, res) => {
        const id = req.params.id;
        const selectSql = "SELECT * FROM board WHERE b_id =" + id;
        model.showBoardDetail(id).then(function (data) {
            res.render("../views/board/detail.ejs", { result: data });
        });
    },
    getUpdate: (req, res) => {
        const id = req.params.id;
        const sql = "SELECT * FROM board WHERE b_id = " + id;
        db.query(sql, (err, result) => {
            if (err) throw err;
            else {
                res.render("../views/board/update", { result });
            }
        });
    },
    postWrite: (req, res) => {
        const board = {
            title: req.body.title,
            content: req.body.content,
        };
        model.writeBoard(board);

        res.redirect("/board/page/1");
    },

    postDelete: (req, res) => {
        const deleteSql = "DELETE FROM board WHERE b_id = " + req.body.idx;
        const updateSql =
            "UPDATE board SET b_id = b_id-1 WHERE b_id > " + req.body.idx;

        db.query(deleteSql, (err) => {
            if (err) throw err;
        });
        db.query(updateSql, (err) => {
            if (err) throw err;
            else {
            }
        });
    },

    postUpdate: (req, res) => {
        const sql =
            "UPDATE board SET title = ?, writer = ?, content = ? WHERE b_id = " +
            req.params.id;
        db.query(
            sql,
            [req.body.title, req.body.writer, req.body.content],
            (err) => {
                if (err) throw err;
            }
        );
    },
};
