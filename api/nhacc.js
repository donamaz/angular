const express = require("express");
const router = express.Router();
const db = require("../database/connect");

router.get("/api/nhacc/get-all", (req, res) => {
    var sql = "SELECT * FROM nha_cung_cap";
    db.query(sql, function(err, result) {
        if (err) {
            console.log("Loi roi");
        } else {
            res.send({ status: true, data: result });
        }
    });
});

// API endpoint để thêm thể loại
router.post("/api/nhacc/add", (req, res) => {
    let details = {
        ten_ncc: req.body.ten_ncc,
        diachi_ncc: req.body.diachi_ncc,
        email: req.body.email,
        sdt: req.body.sdt,
        Delet: req.body.Delet
    };

    let sql = "INSERT INTO nha_cung_cap SET ?";
    db.query(sql, details, (erro) => {
        if (erro) {
            res.send({ status: false, message: "Them that bai" });
        } else {
            res.send({ status: true, message: "Them thanh cong" });
        }
    });
});

// Thêm endpoint để lấy thông tin thể loại theo ID
router.get("/api/nhacc/:id", (req, res) => {
    const nccId = req.params.id;

    const sql = "SELECT * FROM nha_cung_cap WHERE id = ?";
    db.query(sql, [nccId], (err, result) => {
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
router.put('/api/nhacc/:id', (req, res) => {
    const nccId = req.params.id;
    const updatedncc = req.body;

    const sql = 'UPDATE nha_cung_cap SET ten_ncc = ?, diachi_ncc=?, eamil=?, sdt=?, Delet=? WHERE id = ?';
    db.query(sql, [updatedncc.ten_ncc, updatedncc.diachi_ncc, updatedncc.email, diachi_ncc.sdt, diachi_ncc.Delet, nccId], (err, result) => {
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
router.delete('/api/nhacc/:id', (req, res) => {
    const nccId = req.params.id;

    const query = 'DELETE FROM nha_cung_cap WHERE id = ?';

    db.query(query, [nccId], (err, result) => {
        if (err) {
            console.log('lỗi xoá loại sản phẩm:', err);
            res.status(500).send('lỗi serve');
        } else {
            res.status(200).send('Xoá thành công');
        }
    });
});


module.exports = router;