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
app.get('/getAdminLog', function(req, res) {

})
app.post('/login', function(req, res) {
    db.findOne('adminList', {
        adminName: req.body.adminName,
        adminPassWord: md5(req.body.password)
    }, function(err, results) {
        if (results) {
            db.insertOne('adminLog', {
                adminName: results.adminName,
                logType: 4,
                detail: results.adminName + '在' + common.getNowTime() + '登录了系统',
                addTime: Date.now()
            }, function() {
                res.json({
                    ok: 1,
                    adminName: results.adminName,
                    adminId: results._id,
                    msg: '恭喜您，登录成功'
                })
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