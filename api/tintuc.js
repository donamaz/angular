const express = require("express");
const router = express.Router();
const db = require("../database/connect");



router.get("/api/tintuc/get-all", (req, res) => {
    var sql = "SELECT * FROM news";
    db.query(sql, function(err, result) {
        if (err) {
            console.log("Loi roi");
        } else {
            res.send({ status: true, data: result });
        }
    });
});

// API endpoint để thêm thể loại
router.post("/api/tintuc/add", (req, res) => {
    const Now = new Date();
    let details = {
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        created_at: Now
    };

    let sql = "INSERT INTO news SET ?";
    db.query(sql, details, (erro) => {
        if (erro) {
            res.send({ status: false, message: "Them that bai" });
        } else {
            res.send({ status: true, message: "Them thanh cong" });
        }
    });
});

// Thêm endpoint để lấy thông tin thể loại theo ID
router.get("/api/tintuc/:id", (req, res) => {
    const newId = req.params.id;

    const sql = "SELECT * FROM news WHERE id = ?";
    db.query(sql, [newId], (err, result) => {
        if (err) {
            console.error("lỗi :", err);
            res.status(500).json({ error: "lỗi server" });
        } else {
            if (result.length > 0) {
                res.status(200).json(result[0]);
            } else {
                res.status(404).json({ error: "lỗi" });
            }
        }
    });
});

// Thêm endpoint để cập nhật thể loại
router.put('/api/tintuc/:id', (req, res) => {
    const newId = req.params.id;
    const updatednew = req.body;

    const sql = 'UPDATE news SET title = ?, content=?, image=? WHERE id = ?';
    db.query(sql, [updatednew.title, updatednew.content, updatednew.image, newId], (err, result) => {
        if (err) {
            console.error('lỗi sửa loại sản phẩm:', err);
            res.status(500).json({ error: 'lỗi server' });
        } else {
            if (result.affectedRows > 0) {
                res.status(200).json({ message: 'sửa thành công' });
            } else {
                res.status(404).json({ error: 'sửa ko thành công' });
            }
        }
    });
});

// Xóa sản phẩm
router.delete('/api/tintuc/:id', (req, res) => {
    const Id = req.params.id;

    const query = 'DELETE FROM news WHERE id = ?';
    db.query(query, [Id], (err, result) => {
        if (err) {
            console.log('lỗi xoá loại sản phẩm:', err);
            res.status(500).send('lỗi serve');
        } else {
            res.status(200).send('Xoá thành công');
        }
    });
});


module.exports = router;