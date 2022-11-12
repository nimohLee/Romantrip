const service = require("../services/boardService");

/**
 * 
 * @param {Object} searchInfo 사용자가 입력한 검색 값(select option, 검색 text)
 * @returns {Promise} DB 검색결과
 */
const sharedListData = async (searchInfo) => {
    let listData;
    return new Promise(async (resolve, reject) => {
        await service.getBoardList(searchInfo).then(function (result) {
            listData = {
                result : result.boardsResult,
                page: searchInfo.idx,
                pageLength : result.pageLength,
                page_num: 10,
                pass: true,
                session: searchInfo.session,
                selected : searchInfo.selected
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
        /* 페이지 전환 시 select값이 undefined이 되므로 req.query를 직접 사용하지 않고 변수에 저장해서 사용하기 */
        const searchInfo = {
            idx: clickedPage,
            selected: req.query.select, 
            searchTf: req.query.text,
            session: req.session._id,
        };
        
        await sharedListData(searchInfo).then((data) => {
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
                res.status(result).send("success");
            })
            .catch((err) => {
                console.log(err);
                res.status(400).send("잘못작성되었습니다.");
            });
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


    

    getUpdate: (req, res) => {
        
        /* 현재 세션에 로그인된 아이디가 있으면 popupdate() 호출 */
        if(req.session._id){
            const updateDto = {
                boardIdx : req.params.id,
                loginedUser : req.session._id
            }
            service.popupUpdate(updateDto).then(function (data) {
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
            const deleteBoardInfo = {
                boardIdx : req.body.idx,
                loginedUser : req.session._id
            };
            await service.deleteBoard(deleteBoardInfo).then((result)=>{
            res.sendStatus(result);
            });
        
        }else{
            res.sendStatus(401);
        }   
    }
};