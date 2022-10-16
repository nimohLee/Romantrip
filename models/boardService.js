const db = require("../config/db");
const { Board } = require("../database/models/index");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const board = require("../database/models/board");

module.exports = {
    getBoardList: (params) => {
        return new Promise(async (resolve, reject) => {
            let result = [];
            if (params.selected === undefined) {
                const boards = await Board.findAll({
                    /* ORDER BY b_id DESC */
                    order: [["b_id", "DESC"]],
                });
                boards.forEach((board) => {
                    result.push({
                        b_id: board.b_id,
                        m_id: board.m_id,
                        title: board.title,
                        content: board.content,
                        regDate: board.createdAt.toISOString().substring(0, 10),
                        updateDate: board.updatedAt
                            .toISOString()
                            .substring(0, 10),
                        views: board.views,
                    });
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
                    else {
                        results.forEach((board) => {
                            result.push({
                                b_id: board.b_id,
                                m_id: board.m_id,
                                title: board.title,
                                content: board.content,
                                // regDate : board.createdAt.toISOString().substring(0,10),
                                updateDate: board.updatedAt.substring(0, 10),
                                views: board.views,
                            });
                        });
                    }
                });
            }
            setTimeout(() => {
                resolve(result);
            }, 0);
        });
    },
    writeBoard: (params) => {
        return new Promise(async (resolve, reject) => {
            const boardCount = await Board.findAll({
                raw: true,
            });
            const alterIdx =
                "ALTER TABLE Boards AUTO_INCREMENT = " +
                (boardCount.length + 1);
            db.query(alterIdx, (err) => {
                if (err) throw err;
            });
            await Board.create({
                m_id: 123,
                title: params.title,
                content: params.content,
                regDate: new Date(),
                views: 0,
            });
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
                b_id: params,
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
