const db = require("../config/db");
const { Board, User } = require("../database/models/index");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const board = require("../database/models/board");

module.exports = {
    getBoardList: (params) => {
        return new Promise(async (resolve, reject) => {
            let result = [];
            let userName;
            if (params.selected === undefined) {
                const boards = await Board.findAll({
                    /* ORDER BY b_id DESC */
                    order: [["b_id", "DESC"]],
                });     
                
                boards.forEach(async (board) => {
                          pushQueryResult(board); 
                }); 
              
            } else {
                const sql =
                    "SELECT * FROM Boards WHERE " +
                    params.selected +
                    " like '%" +
                    params.searchTf +
                    "%' ORDER BY b_id DESC;";
                db.query(sql, (err, results) => {
                    if (err) throw err;
                    else pushQueryResult(board);
                        });
                       
                    }
                    resolve(result);
                
                    function pushQueryResult(board){
                        result.push({
                            b_id: board.b_id,
                            m_id: board.m_id,
                            m_name : board.m_name,
                            title: board.title,
                            content: board.content,
                            regDate: board.regDate,
                            views: board.views,
                        });  
                    }
                });
               
            },
    writeBoard: (params) => {
        return new Promise(async (resolve, reject) => {
            new Promise(async (resolve,reject)=>{
                const boardCount = await Board.findAll({
                    raw: true,
                });
                const alterIdx =
                    "ALTER TABLE Boards AUTO_INCREMENT = " +
                    (boardCount.length + 1);
                    resolve(alterIdx);
            }).then((alterIdx)=>{
                db.query(alterIdx, (err) => {
                    if (err) throw err;
                    else{
                        console.log(alterIdx);
                        console.log("alter");
                    }
                });
            
            }).then(()=>{
                setTimeout(async () => {
                    await Board.create({
                        m_id: params.m_id,
                        m_name : params.m_name,
                        title: params.title,
                        content: params.content,
                        regDate: new Date(),
                        views: 0,
                    });
                }, 10);
               
               
            })
                
              
               
            
           
        });
    },
    /* update params 수정해야함  */
    showBoardDetail: (id) => {
        return new Promise(async (resolve, reject) => {
            const boards = await Board.findAll({
                where: {
                    b_id: id,
                },
                raw: true, // dataValues만 출력됨
                attributes: [
                    "b_id",
                    "title",
                    "content",
                    "views",
                    [
                        sequelize.fn(
                            "date_format",
                            sequelize.col("regDate"),
                            "%Y-%m-%d"
                        ),
                        "regDate",
                    ],
                ],
            }); // Detail get 시 view에 1추가
            
            /* 에러 남. 추후에 수정하기 */
            // await Board.increment({ views: 1 }, { where: { b_id: id } }); // Will increase age to 15
            setTimeout(() => {
                resolve(boards);
            }, 0);
        });
        
    },
    popupUpdate: (id) => {
        return new Promise(async (resolve, reject) => {
            const boards = await Board.findAll({
                where: {
                    b_id: id,
                },
            });
            setTimeout(() => {
                resolve(boards);
            }, 0);
        });
    },
    deleteBoard: async (id) => {
        const updateSql =
        "UPDATE Boards SET b_id = b_id-1 WHERE b_id > " + id;
        // delete recode
        await Board.destroy({
            where: {
                b_id: id,
            },
        });
        db.query(updateSql, (err) => {
            if (err) throw err;
            else {
            }
        });
    },
    updateBoard : async (params)=>{
        await Board.update({
            title : params.title,
            content : params.content
        },{
            where : {
                b_id : params.id
            }
        })
    }
};
