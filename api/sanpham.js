const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../database/connect");

// Thiết lập Multer cho tải ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload/"); // Thư mục lưu trữ ảnh
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Lưu tên gốc của ảnh
    },
});

router.use("/upload", express.static("upload"));

// Middleware để xử lý tệp tải lên
const upload = multer({ storage: storage });

// getall the books
router.get('/api/sanpham/get-all', (req, res) => {
    const query = `SELECT * FROM san_pham`;

    db.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.json(results);
        }
    });
});


// ...

router.put('/api/sanpham/:id', (req, res) => {
    const sanphamId = req.params.id;
    const isHidden = req.body.isHidden;

    db.query(
        'UPDATE san_pham SET Delet = ? WHERE id = ?', [isHidden, sanphamId],
        (err, result) => {
            if (err) throw err;
            res.json({ message: 'Product updated successfully' });
        }
    );
});



// Thêm sản phẩm mới với ảnh
// Add a new product
router.post("/api/sanpham/add", upload.single("image"), (req, res) => {
    const { name, id_loai_sp, id_ncc, mota_sp, unit_price, gia_km, so_luong, Delet } = req.body;
    const image = req.file.path;

    // Insert new product
    const sql =
        "INSERT INTO san_pham (name, id_loai_sp, id_ncc, mota_sp, unit_price, gia_km, so_luong, image, Delet,created_at,updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(),NOW())";
    db.query(sql, [name, id_loai_sp, id_ncc, mota_sp, unit_price, gia_km, so_luong, image, Delet], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "lỗi" });
        }

        const sanphamId = results.insertId;

        // Get the newly added product
        const getProductQuery = "SELECT * FROM san_pham WHERE id = ?";
        db.query(getProductQuery, [sanphamId], (err, book) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Lỗi" });
            }

            res.status(201).json(book[0]);
        });
    });
});


// API endpoint to get product by ID
router.get('/api/sanpham/:id', (req, res) => {
    const sanphamId = req.params.id;
    const query = 'SELECT * FROM san_pham WHERE id = ?';
    db.query(query, [sanphamId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error getting product');
        } else {
            res.status(200).json(result[0]);
        }
    });
});

// API endpoint to update a product
router.put('/api/sanpham/update/:id', upload.single("image"), (req, res) => {
    const sanphamId = req.params.id;
    const { name, id_loai_sp, id_ncc, mota_sp, unit_price, gia_km, so_luong, Delet } = req.body;
    const image = req.file ? req.file.path : null;

    const query = 'UPDATE san_pham SET name=?, id_loai_sp=?, id_ncc=?, mota_sp=?, unit_price=?, gia_km=?, so_luong=?, image=?, Delet=? WHERE id=?';
    db.query(query, [name, id_loai_sp, id_ncc, mota_sp, unit_price, gia_km, so_luong, image, Delet, sanphamId], (err, result) => {
        if (err) {
            console.error('lỗi sửa sản phẩm:', err);
            res.status(500).json({ error: 'lỗi Server ' });
        } else {
            if (result.affectedRows > 0) {
                res.status(200).json({ message: 'sửa thành công' });
            } else {
                res.status(404).json({ error: 'sửa thất bại' });
            }
        }
    });
});

// Delete the books
router.delete('/api/sanpham/:id', (req, res) => {
    const sanphamId = req.params.id;

    const deleteQuery = 'DELETE FROM san_pham WHERE id = ?';

    db.query(deleteQuery, [sanphamId], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.json({ message: 'xoá thành công' });
        }
    });
});


module.exports = router;