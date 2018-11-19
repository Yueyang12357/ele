const express = require('express');
const db = require('./modules/db');
const common = require('./modules/common');
const md5 = require('md5');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next()
})
app.post('/login', function(req, res) {
    db.findOne('adminList', {
        adminName: req.body.adminName,
        password: md5(req.body.password)
    }, function(err, results) {
        if (results) {
            res.json({
                ok: 1,
                msg: '恭喜您，登录成功'
            })
        } else {
            res.json({
                ok: 2,
                msg: '账户名or密码错误'
            })
        }
    })
})
app.listen(80, function() {
    console.log('success');
})