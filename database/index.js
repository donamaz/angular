const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");

const sanphamAPI = require("../api/sanpham");
const loaispAPI = require("../api/loaisp");
const userpAPI = require("../api/user");
const homeAPI = require("../api/home");
const nhaccAPI = require("../api/nhacc");
const tintucAPI = require("../api/tintuc");
const donhangAPI = require("../api/donhang");


const app = express();
const port = 3000;


// const categoryAPI = require('./category-api');

// app.use('/categories', categoryAPI);
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/upload', express.static('upload'));
app.use(express.static('public'));
app.use("/", sanphamAPI);
app.use("/", loaispAPI);
app.use("/", userpAPI);
app.use("/", homeAPI);
app.use("/", nhaccAPI);
app.use("/", tintucAPI);
app.use("/", donhangAPI);


app.listen(port, (erro) => {
    if (erro) {
        console.log("Error....!!!");
    } else {
        console.log(`Server is running on port ${port}`);
    }
});