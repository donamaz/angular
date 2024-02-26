const express = require("express");
const router = express.Router();
const db = require("../database/connect");
const jwt = require('jsonwebtoken');

router.get('/getall', function(req, res, next) {
    var sql = "SELECT * FROM `user`";
    db.query(sql, function(err, results) {
        if (err) {
            throw err;
        }
        console.log(results); // good
        res.json(results);
    })
});

router.get('/get-once/:user_id', function(req, res) {
    var query = 'SELECT * FROM user WHERE user_id=' + req.params.user_id;
    db.query(query, function(error, result) {
        if (error) res.send('Lổi thao tác csdl');
        res.json(result);
    });
});

router.post('/user/login', (req, res) => {
    const { user_email, user_password } = req.body;

    const query = 'SELECT * FROM user WHERE user_email = ? AND user_password = ?';
    db.query(query, [user_email, user_password], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.length > 0) {
                // Người dùng đăng nhập thành công
                res.json({ success: true, user: results[0] });
            } else {
                // Sai thông tin đăng nhập
                res.status(401).json({ success: false, message: 'Invalid username or password' });
            }
        }
    });
});
router.post('/user/register', (req, res) => {
    let details = {
        user_email: req.body.user_email,
        user_password: req.body.user_password,
        user_name: req.body.user_name,
        user_phone: req.body.user_phone,
        quyen: req.body.quyen
    };
    let sql = "INSERT INTO user SET ?";
    db.query(sql, details, (error) => {
        if (error) {
            console.error('Insertion error:', error);
            res.status(500).send({ status: false, message: "Thêm thất bại" });
        } else {
            res.status(201).send({ status: true, message: "Thêm thành công" });
        }
    });
});




module.exports = router;