module.exports = {
    select : "SELECT * FROM board WHERE ? like ? ORDER BY b_id DESC",
    selectById : "SELECT * FROM board WHERE b_id = ?",
    selectAll : "SELECT * FROM board ORDER BY b_id DESC",
    update : "UPDATE board SET title = ?, writer = ?, content = ? WHERE b_id = ?",
    updateViews : "UPDATE board SET views = views+1 WHERE b_id = ?",
    insert : "INSERT INTO board VALUES(NULL,?,?,?,?,?)",
    sortIdx : "ALTER TABLE board AUTO_INCREMENT = ?",
    sortBoard : "UPDATE board SET b_id = b_id-1 WHERE b_id > ?",
    deleteById : "DELETE FROM board WHERE b_id = ?",
}