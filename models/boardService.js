const db = require('../config/db');
const { Board } = require('../database/models/index')


module.exports = {
    getBoardList : (params) => {
        return new Promise(async (resolve, reject) => {

            let result = [];
            if(params.selected === undefined){
                
                const boards = await Board.findAll({
                    /* ORDER BY b_id DESC */
                    order : [
                        ['b_id', 'DESC']
                    ]
                });
                boards.forEach((board)=>{
                    result.push({
                        b_id : board.b_id,
                        m_id : board.m_id,
                        title : board.title,
                        content : board.content,
                        regDate : board.createdAt.toISOString().substring(0,10),
                        updateDate : board.updatedAt.toISOString().substring(0,10),
                        views : board.views
                    })
                });
                
            }else {
                const sql = "SELECT * FROM Boards WHERE " +
                        params.selected +
                        " like '%" +
                        params.searchTf +
                        "%' ORDER BY b_id DESC;";
                db.query(sql, (err,results)=>{
                    if(err) throw err;
                    else{
                        
                        results.forEach((board)=>{
                            result.push({
                                b_id : board.b_id,
                                m_id : board.m_id,
                                title : board.title,
                                content : board.content,
                                // regDate : board.createdAt.toISOString().substring(0,10),
                                updateDate : board.updatedAt.substring(0,10),
                                views : board.views
                            })
                        });
                        
                    }
                });
            }
            setTimeout(()=>{
                resolve(result);
            },0)
            
        });
    }
}