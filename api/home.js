const express = require("express");
const router = express.Router();
const db = require("../database/connect");

router.get('/api/home/getlsp', function(req, res, next) {
    var sql = "SELECT * FROM `loai_sp`";

    db.query(sql, function(err, results) {
        if (err) {
            throw err;
        }
        console.log(results); // good
        res.json(results);
    })
});
router.get("/api/home/danhmuc/:id", (req, res) => {
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
router.get('/api/home/getsp', function(req, res, next) {
    var sql = "SELECT * FROM `san_pham`";

    db.query(sql, function(err, results) {
        if (err) {
            throw err;
        }
        console.log(results); // good
        res.json(results);
    })
});
router.get('/api/home/getsp/:id', function(req, res, next) {
    var id = req.params.id;
    var sql = "SELECT * FROM `san_pham` where id=" + id;

    db.query(sql, function(err, results) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log(results); // good
        res.json(results);
    });
});
// POST /login gets urlencoded bodies
router.get('/api/home/sanphammoi', function(req, res, next) {
    var sql = "SELECT * FROM san_pham WHERE Delet = 0 ORDER BY created_at DESC LIMIT 10";

    db.query(sql, function(err, results) {
        if (err) {
            throw err;
        }
        console.log(results); // good
        res.json(results);
    })
});
// router.get('/api/home/sanphamchay', function(req, res, next) {
//     var sql = "SELECT * FROM san_pham WHERE Delet = 1 ORDER BY created_at DESC LIMIT 5";

//     db.query(sql, function(err, results) {
//         if (err) {
//             throw err;
//         }
//         console.log(results); // good
//         res.json(results);
//     })
// });

router.get('/api/home/sanphamkm', function(req, res, next) {
    var sql = "SELECT * FROM san_pham WHERE gia_km > 0 and Delet = 0";

    db.query(sql, function(err, results) {
        if (err) {
            throw err;
        }
        console.log(results); // good
        res.json(results);
    })
});


router.get('/api/home/sanphamdm/:id', function(req, res, next) {
    const Id = req.params.id;
    // Thực hiện truy vấn SQL để lấy ra sản phẩm tương tự
    const sql = 'SELECT * from san_pham where id_loai_sp =?';

    db.query(sql, [Id], function(err, results) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.json(results);
    });
});
router.get('/api/home/search', (req, res) => {
    const { sanpham } = req.query;

    if (!sanpham) {
        return res.status(400).json({ error: 'Thiếu thông số sản phẩm' });
    }

    const searchTerm = `%${sanpham}%`;
    const query = 'SELECT * FROM san_pham WHERE name LIKE ?';

    db.query(query, [searchTerm], (error, results, fields) => {
        if (error) {
            console.error('Lỗi tìm kiếm sản phẩm:', error);
            return res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm nào' });
        }

        res.json(results);
    });
});


module.exports = router;