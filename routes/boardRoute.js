const express = require('express');
const db = require('../model/database');
const router = express.Router();




router.get("/page/:page",(req, res) =>{
    const page = req.params.page;
    const selected = req.query.select;
    const searchTf = req.query.text;
    let sql;
    if(selected === undefined){
        sql = "SELECT * FROM board ORDER BY b_id DESC";     
    }else{
        sql = "SELECT * FROM board WHERE "+selected+" like '%"+searchTf+"%' ORDER BY b_id DESC;";
    }

    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.render("../views/board/boardList.ejs",{result : result, page: page, length: result.length-1, page_num:10,pass:true});
    })
});

router.get("/list/page/",(req, res) =>{
    
});

router.get("/write",(req, res) =>{
    res.render("../views/board/boardWrite.ejs");
});

router.post("/writeProc",(req,res)=>{
    const board = {
        title: req.body.title,
        writer: req.body.writer,
        content: req.body.content,
    };
    const addBoardSql = "INSERT INTO board VALUES(NULL,?,?,?,?,?);";
    const selectCount = "SELECT * FROM board;";
    
    
              /* member 테이블의 AUTO_INCREMENT 값을 현재 row의 개수+1로 초기화 
               초기화 하지않으면 삭제 후 새로 삽입되는 row는 idx값이 계속 올라감 */

    db.query(selectCount,(err,result)=>{
        if(err) throw err;
        else{
            const rowsCount = result.length;
            const alterIdx = "ALTER TABLE board AUTO_INCREMENT = "+(rowsCount+1); 
            db.query(alterIdx,(err)=>{
                if(err) throw err;
            });

    db.query(addBoardSql,[board.title,board.writer,board.content,new Date(),0],(err)=>{
        if(err) throw err;
    });
        }
    });
  
    res.redirect("/board/page/1");
})

router.get("/detail/:id",(req, res) =>{
    const id = req.params.id;
    const selectSql = "SELECT * FROM board WHERE idx ="+id;
    const updateViewSql = "UPDATE board SET views = views+1 WHERE idx = "+id;
    db.query(selectSql,(err,result)=>{
        if(err) throw err;
        else{
            res.render("../views/board/boardDetail.ejs",{result});        
        }
    });
    db.query(updateViewSql,(err)=>{
        if(err) throw err;
    })
});

router.post("/detail/deleteProc",(req,res)=>{
    const deleteSql = "DELETE FROM board WHERE idx = "+req.body.idx;
    const updateSql = "UPDATE board SET idx = idx-1 WHERE idx > "+req.body.idx;
    
    db.query(deleteSql,(err) => {if(err) throw err;});
    db.query(updateSql,(err) => {if(err) throw err; else{
    }});
});

router.get("/detail/update/:id",(req,res)=>{
    const id = req.params.id;
    const sql = "SELECT * FROM board WHERE idx = "+id;
    db.query(sql,(err,result)=>{
        if(err) throw err;
        else{
            res.render("../views/board/boardUpdate",{result});
        }
    })
});

router.post("/detail/update/:id",(req,res)=>{
    const sql = "UPDATE board SET title = ?, writer = ?, content = ? WHERE idx = "+req.params.id;
    db.query(sql,[req.body.title,req.body.writer,req.body.content],(err)=>{
        if(err) throw err;
    })
});


module.exports = router;