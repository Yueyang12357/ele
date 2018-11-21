const express = require('express');
const db = require('./modules/db');
const common = require('./modules/common');
const TypeEnum = require('./modules/TypeEnum');
const upPic = require('./modules/upPic');
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
    var pageIndex = req.query.pageIndex;
    var keyword = req.query.keyword;
    var i = {};
    if (keyword) {
        i.detail = { $regex: keyword }
    }
    var pageSum = 1;
    var pageNum = 5;
    db.count('adminLog', i, function(count) {
        pageSum = Math.ceil(count / pageNum);
        if (pageSum < 1) {
            pageSum = 1
        };
        if (pageIndex > pageSum) {
            pageIndex = pageSum
        }
        db.find('adminLog', {
            whereObj: i,
            skipNum: (pageIndex - 1) * pageNum,
            limitNum: pageNum
        }, function(err, adminLogList) {
            res.json({
                ok: 1,
                adminLogList,
                logTypeEnum: TypeEnum.logTypeEnum,
                pageSum: pageSum
            })
        })
    })
})
app.get('/getShopTypeList', function(req, res) {
    var pageIndex = req.query.pageIndex;
    var keyword = req.query.keyword;
    var i = {};
    if (keyword) {
        i.detail = { $regex: keyword }
    }
    var pageSum = 1;
    var pageNum = 5;
    db.count('shopTypeList', i, function(count) {
        pageSum = Math.ceil(count / pageNum);
        if (pageSum < 1) {
            pageSum = 1
        };
        if (pageIndex > pageSum) {
            pageIndex = pageSum
        }
        db.find('shopTypeList', {
            whereObj: i,
            skipNum: (pageIndex - 1) * pageNum,
            limitNum: pageNum
        }, function(err, shopTypeList) {
            res.json({
                ok: 1,
                shopTypeList,
                pageSum: pageSum
            })
        })
    })
})
app.post('/addShopType', function(req, res) {
    db.insertOne('shopTypeList', {
        shopTypeName: req.body.shopTypeName,
        shopTypePic: '',
        orderNum: req.body.orderNum,
        createTime: common.getNowTime(),
        upTime: common.getNowTime(),
    }, function(err, shopTypeList) {
        res.json({
            ok: 1,
            shopTypeList
        })
    })
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