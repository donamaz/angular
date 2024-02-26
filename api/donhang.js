const express = require("express");
const router = express.Router();
const db = require("../database/connect");
const moment = require('moment');
const session = require('express-session');
// Sử dụng session
router.use(session({
    secret: 'your_secret_key',
    resave: true,
    saveUninitialized: true
}));


router.get('/api/donhang/getall', function(req, res) {
    var query = 'SELECT * FROM don_hang';
    db.query(query, function(error, result) {
        if (error) res.send(error);
        res.json(result);
    });
});

router.get('/api/donhang/getallctb', function(req, res) {
    var query = 'SELECT * FROM ct_don_hang';
    db.query(query, function(error, result) {
        if (error) res.send(error);
        res.json(result);
    });
});

router.get('/api/donhang/get-once/:id', function(req, res) {
    var query = 'SELECT * FROM don_hang WHERE id=' + req.params.id;
    db.query(query, function(error, result) {
        if (error) res.send(error);
        else {
            res.json(result);
        }
    });
});


router.get('/api/donhang/by-hdb/:id', (req, res) => {
    const id = req.params.id;

    // Thực hiện truy vấn để lấy các sản phẩm thuộc danh mục có ID tương ứng
    const getchitiethdbbydbQuery = 'SELECT dh.*, ct.*, sp.* FROM don_hang dh INNER JOIN ct_don_hang ct ON dh.id = ct.id_dh INNER JOIN san_pham sp ON ct.id_sp = sp.id WHERE dh.id = ?';

    db.query(getchitiethdbbydbQuery, [id], (error, results, fields) => {
        if (error) {
            console.error('Lỗi truy vấn: ' + error);
            res.status(500).send('Lỗi server');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('Không có sản phẩm nào');
            return;
        }

        res.json(results); // Trả về danh sách sản phẩm thuộc danh mục có ID tương ứng
    });
});

router.post('/api/donhang/add', (req, res) => {
    const { name, phone, email, diachi, tongtien, trangthai, ptthanhtoan } = req.body;
    const ngaydat = moment().format('YYYY-MM-DD'); // Lấy ngày hôm nay và định dạng nó
    // Tạo đơn hàng mới
    db.query('INSERT INTO don_hang (name, phone, email, diachi, tongtien, trangthai, ngaydat, ptthanhtoan) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [name, phone, email, diachi, tongtien, trangthai, ngaydat, ptthanhtoan], (err, result) => {
        if (err) throw err;

    });
});
router.post('/api/donhang/adds', (req, res) => {
    const { id_dh, id_sp, image, price, soluong, ten } = req.body;
    // Tạo đơn hàng mới
    db.query('INSERT INTO ct_don_hang (id_dh, id_sp, image, price, soluong, ten) VALUES (?, ?, ?, ?, ?, ?)', [id_dh, id_sp, image, price, soluong, ten], (err, result) => {
        if (err) throw err;

    });
});
router.get('/api/donhang/getid', function(req, res) {
    var query = "SELECT * FROM don_hang ORDER BY id DESC LIMIT 1 "
    db.query(query, function(error, result) {
        if (error) res.send(error);
        res.json(result);
    });
});

router.get('/api/donhang/delete/:id', function(req, res) {
    const { id } = req.params;

    const query = `DELETE FROM don_hang WHERE id = ${id}`;

    db.query(query, (err, result) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Error executing MySQL query');
        } else {
            console.log('Data deleted successfully');
            res.status(200).send('Data deleted successfully');
        }
    });
});

module.exports = router;