/* controller에서는  데이터 가공등 서비스 로직 X 
import { axios } from 'axios';
1. 컨트롤러는 들어오는 클라이언트 요청을 받고 서비스에 전달한다.
2. 서비스에서 작업을 마친 데이터를 받아 클라이언트에게 응답한다.
3. res, req는 controller에서만 control */

const db = require("../config/db");
const service = require("../services/boardService");
const { user, Board } = require("../database/models/index");
const axios = require("axios");
const request = require("request");

/*  */
const sharedListData = async (params) => {
    let listData;

    return new Promise(async (resolve, reject) => {
        await service.getBoardList(params).then(function (data) {
            listData = {
                result: data,
                page: params.page,
                length: data.length - 1,
                page_num: 10,
                pass: true,
                session: params.session,
            };

            setTimeout(() => {
                resolve(listData);
            }, 100);
        });
    });
};

module.exports = {
    getMain: async (req, res) => {
        const params = {
            page: req.params.page,
            selected: req.query.select,
            searchTf: req.query.text,
            session: req.session._id,
        };


        await sharedListData(params).then((data) => {
            res.render("../views/board/list.ejs", data);
        })
    },

    getWrite: (req, res) => {
        if (req.session._id) {
            res.status(200).render("../views/board/write.ejs", {
                session: req.session._id,
            });
        } else {
            /* If client didn't login, print alert and locate to login page when client click write button*/
            res.status(400).send(
                "<script>alert('로그인이 필요합니다'); location.href = '/users/login';</script>"
            );
        }
    },
    getDetail: async (req, res) => {
        const id = req.params.id;
        await service.showBoardDetail(id).then(function (data) {
            res.render("../views/board/detail.ejs", {
                result: data,
                session: req.session._id,
            });
        });
    },
    getUpdate: (req, res) => {
        const id = req.params.id;
        service.popupUpdate(id).then(function (data) {
            res.render("../views/board/update", {
                result: data,
                session: req.session._id,
            });
        });
    },

    postWrite: async (req, res) => {
        console.log(req.session._id);
        const board = {
            title: req.body.title,
            content: req.body.content,
            m_id: req.session._id,
            m_name: req.session._name,
        };

        // const params = {
        //     page: 1,
        //     selected: req.query.select,
        //     searchTf: req.query.text,
        // };

        await service
            .writeBoard(board)
            .then((result) => {
                res.status(201).send("success");
            })
            .catch((err) => {
                console.log(err);
                res.status(400).send("잘못작성되었습니다.");
            });
    },

    postDelete: (req, res) => {
        const idx = req.body.idx;
        service.deleteBoard(idx);
    },

    postUpdate: (req, res) => {
        const updateDto = {
            id: req.params.id,
            title: req.body.title,
            content: req.body.content,
        };
        service.updateBoard(updateDto);
    },
};
