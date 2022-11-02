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
        await service.getBoardList(params).then(function (result) {
            listData = {
                result : result.boardsResult,
                page: params.idx,
                pageLength : result.pageLength,
                // length: data.length,
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
        
        const clickedPage = req.query.clickedPageNum === undefined ? 1 : req.query.clickedPageNum;
        
        const params = {
            idx: clickedPage,
            selected: req.query.select,
            searchTf: req.query.text,
            session: req.session._id,
        };
        await sharedListData(params).then((data) => {
            if(data.page===1)
                res.status(200).render("../views/board/list.ejs", data);
             else
            /* 페이지 버튼 클릭에 따른 동적인 렌더링을 위해 별도의 ejs파일 render */
                res.status(200).render("../views/board/pagingList.ejs",data);
        }).catch(()=>{
                res.status(400);
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
        }).catch((result)=>{
            res.status(result).send("<script>alert('잘못된 접근입니다'); history.back();</script>")
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

    getUpdate: (req, res) => {
        
        /* 현재 세션에 로그인된 아이디가 있으면 popupdate() 호출 */
        if(req.session._id){
            const params = {
                boardIdx : req.params.id,
                loginedUser : req.session._id
            }
            service.popupUpdate(params).then(function (data) {
                res.render("../views/board/update", {
                    result: data,
                    session: req.session._id,
                });
            }).catch((reason)=>{
                res.status(reason).send("<script>alert('글쓴이만 수정할 수 있습니다'); location.href = document.referrer;</script>");
            });
        }
        else{
            res.status(401).send("<script>alert('로그인이 필요합니다'); location.href = '/users/login'</script>");
        }
        
    },

    postUpdate: (req, res) => {
        const updateDto = {
            id: req.params.id,
            title: req.body.title,
            content: req.body.content,
        };
        service.updateBoard(updateDto).then(()=>{
            res.status(200).send("success");
        }).catch(()=>{
            res.status(400).send("fail");
        });
    },

    postDelete: async (req, res) => {
        if(req.session._id){
            const params = {
                boardIdx : req.body.idx,
                loginedUser : req.session._id
            };
            /**
             * @result deleteBoard() 후 리턴된 상태코드
             **/
            await service.deleteBoard(params).then((result)=>{
            res.sendStatus(result);
            });
        
        }else{
            res.sendStatus(401);
        }   
    }
};