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
                session : req.session._id
            });
        });
    },

    getWrite: (req, res) => {
        res.render("../views/board/write.ejs",{session : req.session._id});
    },
    getDetail: async (req, res) => {
        const id = req.params.id;
        await model.showBoardDetail(id).then(function (data) {
            res.render("../views/board/detail.ejs", { result: data, session : req.session._id });
        });
    },
    getUpdate: (req, res) => {
        const id = req.params.id;
        model.popupUpdate(id).then(function (data) {
            res.render("../views/board/update", { result: data , session : req.session._id});
        });
    },
    postWrite: (req, res) => {
        const board = {
            title: req.body.title,
            content: req.body.content,
            m_id: req.session._id,
            writer: req.session._name
        };
        model.writeBoard(board);
        res.redirect("/board/page/1");
    },

    postDelete: (req, res) => {
        const idx = req.body.idx;
        model.deleteBoard(idx);
    },

    postUpdate: (req, res) => {
        const updateDto = {
            id: req.params.id,
            title: req.body.title,
            content: req.body.content,
        };
        model.updateBoard(updateDto);
    },
};