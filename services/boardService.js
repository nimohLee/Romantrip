const db = require("../config/db");
const { Board, User } = require("../database/models/index");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const board = require("../database/models/Board");

/**
 * @param  {Array} boards SELECT * FROM Boards 의 결과 Array
 * @param  {number} idx Client가 클릭한 페이징 넘버
 * @const  {number} minBoardIndex 각각 페이지 별 화면에 나타나는 배열의 최소 인덱스 값 ( 페이지 1이면 10 - 10 이므로 0 )
 * @const  {number} maxBoardIndex 각각 페이지 별 화면에 나타나는 배열의 최대 인덱스 값 ( 페이지 1이면 1 * 10 이므로 10)
 * @result idx값에 따라 slice 처리된 배열
 */
function boardPageSlice(boards, idx) {
    const maxBoardIndex = idx * 10;
    const minBoardIndex = maxBoardIndex - 10;
    const result = boards.slice(minBoardIndex, maxBoardIndex);
    return result;
}

module.exports = {
    /**
     *
     * @param {Object} searchInfo 사용자가 입력한 검색 값(select option, 검색 text)
     * @returns {Promise} 검색결과 or 모든 게시글
     */
    getBoardList: (searchInfo) => {
        return new Promise(async (resolve, reject) => {
            let result = {
                pageLength: undefined,
                boardsResult: [],
            };

            if (
                searchInfo.selected === undefined ||
                searchInfo.selected === ""
            ) {
                await Board.findAll({
                    /* ORDER BY b_id DESC */
                    order: [["b_id", "DESC"]],
                    attributes: {
                        include: [
                            "b_id",
                            "m_id",
                            "m_name",
                            "title",
                            "content",
                            [
                                /* 작성일 Date FORMAT 지정  */
                                sequelize.fn(
                                    "DATE_FORMAT",
                                    sequelize.col("regDate"),
                                    "%Y-%m-%d %H:%i:%s"
                                ),
                                "regDate",
                            ],

                            "views",
                        ],
                    },
                    raw: true,
                }).then((boards) => {
                    if (searchInfo.idx === undefined) {
                        result.boardsResult = boardPageSlice(boards, 1);
                    } else {
                        result.boardsResult = boardPageSlice(
                            boards,
                            searchInfo.idx
                        );
                    }
                    result.pageLength = boards.length;
                    resolve(result);
                });
            } else {
                await Board.findAll({
                    where: {
                        [Op.or]: [
                            {
                                [searchInfo.selected]: {
                                    [Op.substring]: searchInfo.searchTf,
                                },
                            },
                        ],
                    },

                    order: [["b_id", "DESC"]],
                    attributes: {
                        include: [
                            "b_id",
                            "m_id",
                            "m_name",
                            "title",
                            "content",
                            [
                                /* 작성일 Date FORMAT 지정  */
                                sequelize.fn(
                                    "DATE_FORMAT",
                                    sequelize.col("regDate"),
                                    "%Y-%m-%d %H:%i:%s"
                                ),
                                "regDate",
                            ],

                            "views",
                        ],
                    },
                    raw: true,
                }).then((boards) => {
                    if (searchInfo.idx === undefined) {
                        result.boardsResult = boardPageSlice(boards, 1);
                    } else {
                        result.boardsResult = boardPageSlice(
                            boards,
                            searchInfo.idx
                        );
                    }
                    result.pageLength = boards.length;
                    resolve(result);
                });
            }
        });
    },
    writeBoard: (params) => {
        let result;

        return new Promise(async (resolve, reject) => {
            new Promise(async (resolve, reject) => {
                const boardCount = await Board.findAll({
                    raw: true,
                });
                const alterIdx =
                    "ALTER TABLE Boards AUTO_INCREMENT = " +
                    (boardCount.length + 1);
                resolve(alterIdx);
            })
                .then((alterIdx) => {
                    db.query(alterIdx, (err) => {
                        if (err) {
                            throw err;
                        }
                    });
                })
                .then(() => {
                    setTimeout(async () => {
                        await Board.create({
                            m_id: params.m_id,
                            m_name: params.m_name,
                            title: params.title,
                            content: params.content,
                            regDate: new Date(),
                            views: 0,
                        })
                            .then(() => {
                                console.log("성공");
                                result = 201;
                            })
                            .catch((err) => {
                                console.log(err);
                                result = err;
                            });
                    }, 10);
                })
                .then(() => {
                    setTimeout(() => {
                        if (result === 201) resolve(result);
                        else reject(result);
                    }, 500);
                });
        });
    },

    /**
     *
     * @param {Number} id 게시글 자세히 보기 위한 해당 게시글 id값
     * @returns id 값으로 조회된 해당 게시글 정보
     */
    showBoardDetail: (id) => {
        return new Promise(async (resolve, reject) => {
            /**
             * @type {number} HTTP status code
             */
            let result;
            await Board.findAll({
                where: {
                    b_id: id,
                },
                raw: true, // dataValues만 출력됨
                attributes: [
                    "b_id",
                    "title",
                    "content",
                    "views",
                    "m_name",
                    [
                        sequelize.fn(
                            "date_format",
                            sequelize.col("regDate"),
                            "%Y-%m-%d"
                        ),
                        "regDate",
                    ],
                ],
            }).then(async (boards) => {
                /* 해당 파라미터 (id)를 b_id로 하는 레코드가 DB에 없다면 */
                if (boards.length === 0) {
                    reject(400);
                } else {
                    await Board.increment(
                        { views: 1 },
                        { where: { b_id: id } }
                    ); // Will increase age to 15
                    setTimeout(() => {
                        resolve(boards);
                    }, 0);
                }
            });
            // Detail get 시 view에 1추가
        });
    },

    /**
     *
     * @param {Object} updateDto 게시글 idx값, 세션 사용자 정보
     * @returns 해당 게시글 데이터
     */
    popupUpdate: (updateDto) => {
        return new Promise(async (resolve, reject) => {
            const boards = await Board.findAll({
                where: {
                    b_id: updateDto.boardIdx,
                },
                raw: true,
            });
            setTimeout(() => {
                if (boards[0].m_id === updateDto.loginedUser) resolve(boards);
                else reject(403);
            }, 0);
        });
    },

    /**
     *
     * @param {Object} deleteBoardInfo 삭제하기 위한 게시글 idx값과 세션 유저
     * @returns HTTP 상태 코드
     */
    deleteBoard: async (deleteBoardInfo) => {
        const deleteDto = {
            b_id: deleteBoardInfo.boardIdx,
            m_id: deleteBoardInfo.loginedUser,
        };

        const updateSql =
            "UPDATE Boards SET b_id = b_id-1 WHERE b_id > " +
            deleteBoardInfo.boardIdx;

        return new Promise(async (resolve, reject) => {
            await Board.destroy({
                where: {
                    b_id: deleteBoardInfo.boardIdx,
                    m_id: deleteBoardInfo.loginedUser,
                },
            }).then((data) => {
                if (data === 0) {
                    resolve(403);
                } else {
                    db.query(updateSql, (err) => {
                        if (err) throw err;
                        else {
                            resolve(200);
                        }
                    });
                }
            });
        });
    },

    /**
     *
     * @param {Object} updateDto 업데이트할 사용자 세션id와 게시글 idx
     */
    updateBoard: async (updateDto) => {
        await Board.update(
            {
                title: updateDto.title,
                content: updateDto.content,
            },
            {
                where: {
                    b_id: updateDto.id,
                },
            }
        );
    },
};
