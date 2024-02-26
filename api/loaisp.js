const express = require("express");
const router = express.Router();
const db = require("../database/connect");

router.get("/api/loaisp/get-all", (req, res) => {
    var sql = "SELECT * FROM loai_sp";
    db.query(sql, function(err, result) {
        if (err) {
            console.log("Loi roi");
        } else {
            res.send({ status: true, data: result });
        }
    });
});

// API endpoint để thêm thể loại
router.post("/api/loaisp/add", (req, res) => {
    let details = {
        tenloai: req.body.tenloai,
        Delet: req.body.Delet
    };

    let sql = "INSERT INTO loai_sp SET ?";
    db.query(sql, details, (erro) => {
        if (erro) {
            res.send({ status: false, message: "Them that bai" });
        } else {
            res.send({ status: true, message: "Them thanh cong" });
        }
    });
});

// Thêm endpoint để lấy thông tin thể loại theo ID
router.get("/api/loaisp/:id", (req, res) => {
    const lspId = req.params.id;

    const sql = "SELECT * FROM loai_sp WHERE id = ?";
    db.query(sql, [lspId], (err, result) => {
        if (err) {
            console.error("lỗi lấy loại sản phẩm:", err);
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
router.put('/api/loaisp/:id', (req, res) => {
    const genreId = req.params.id;
    const updatedGenre = req.body;

    const sql = 'UPDATE loai_sp SET tenloai = ? WHERE id = ?';
    db.query(sql, [updatedGenre.tenloai, genreId], (err, result) => {
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
router.delete('/api/loaisp/:id', (req, res) => {
    const productId = req.params.id;

    const query = 'DELETE FROM loai_sp WHERE id = ?';

    db.query(query, [productId], (err, result) => {
        if (err) {
            console.log('lỗi xoá loại sản phẩm:', err);
            res.status(500).send('lỗi serve');
        } else {
            res.status(200).send('Xoá thành công');
        }
    });
});


module.exports = router;