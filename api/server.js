const express = require('express');
const db = require('./modules/db');
const common = require('./modules/common');
const TypeEnum = require('./modules/TypeEnum');
const upPic = require('./modules/upPic');
const md5 = require('md5');
const fs = require('fs');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('./upload'))
app.use(bodyParser.json());
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'DELETE,OPTIONS,PUT')
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next()
});
//管理系统
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
        i.shopTypeName = { $regex: keyword }
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
            sortObj: { createTime: -1 },
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
    upPic.upPic(req, 'shopTypePic', function(obj) {
        if (obj.ok == 1) {
            db.insertOne('shopTypeList', {
                shopTypeName: obj.params.shopTypeName,
                shopTypePic: obj.newPicName,
                createTime: Date.now(),
                upTime: Date.now(),
            }, function(err, shopTypeList) {
                res.json({
                    ok: 1,
                    msg: '上传成功'
                })
            })
        } else {
            res.json({
                ok: 2,
                msg: 'obj.msg'
            })
        }
    })
})
app.put('/updateShopType', function(req, res) {
    upPic.upPic(req, 'shopTypePic', function(obj) {
        if (obj.ok == 1) {
            var id = mongodb.ObjectId(obj.params.shopTypeId)
            db.findOne('shopTypeList', id, function(err, results) {
                fs.unlink('./upload/' + results.shopTypePic, function(err) {
                    db.updateOneById('shopTypeList', id, {
                        $set: {
                            shopTypeName: obj.params.shopTypeName,
                            shopTypePic: obj.newPicName,
                            upTime: Date.now()
                        }
                    }, function(err, shopTypeList) {
                        res.json({
                            ok: 1,
                            msg: '更新成功'
                        })
                    })
                })
            })
        } else {
            res.json({
                ok: 2,
                msg: obj.msg
            })
        }
    })
})
app.get('/getShopType', function(req, res) {
    db.find('shopTypeList', {
        sortObj: {
            createTime: -1
        }
    }, function(err, shopTypeList) {
        res.json({
            ok: 1,
            shopTypeList
        })
    })
})
app.delete('/delshopType', function(req, res) {
    var id = req.query.id;
    db.findOne('shopTypeList', {
        _id: mongodb.ObjectId(id)
    }, function(err, obj) {
        fs.unlink('./upload/' + obj.shopTypePic, function(err, results) {
            db.deleteOneById('shopTypeList', id, function(err, results) {
                res.json({
                    ok: 1,
                    msg: '删除成功'
                })
            })
        })
    })
})
app.post('/addShop', function(req, res) {
    upPic.upPic(req, 'shopPic', function(obj) {
        if (obj.ok == 1) {
            db.findOneById('shopTypeList', obj.params.shopTypeId, function(err, shopTypeList) {
                db.insertOne('shopList', {
                    shopName: obj.params.shopName,
                    shopType: shopTypeList.shopTypeName,
                    shopPic: obj.newPicName,
                    createTime: Date.now(),
                    upTime: Date.now(),
                }, function(err, results) {
                    res.json({
                        ok: 1,
                        msg: '上传成功'
                    })
                })
            })
        } else {
            res.json({
                ok: 2,
                msg: 'obj.msg'
            })
        }
    })
})
app.get('/getShopList', function(req, res) {
    var pageIndex = req.query.pageIndex;
    var keyword = req.query.keyword;
    var i = {};
    if (keyword) {
        i.shopName = { $regex: keyword }
    }
    var pageSum = 1;
    var pageNum = 5;
    db.count('shopList', i, function(count) {
        pageSum = Math.ceil(count / pageNum);
        if (pageSum < 1) {
            pageSum = 1
        };
        if (pageIndex > pageSum) {
            pageIndex = pageSum
        }
        db.find('shopList', {
            whereObj: i,
            sortObj: { createTime: -1 },
            skipNum: (pageIndex - 1) * pageNum,
            limitNum: pageNum
        }, function(err, shopList) {
            res.json({
                ok: 1,
                shopList,
                pageSum: pageSum
            })
        })
    })
})
app.put('/updateShop', function(req, res) {
    upPic.upPic(req, 'shopPic', function(obj) {
        if (obj.ok == 1) {
            var id = mongodb.ObjectId(obj.params.shopId)
            db.findOne('shopList', id, function(err, results) {
                fs.unlink('./upload/' + results.shopPic, function(err) {
                    db.updateOneById('shopList', id, {
                        $set: {
                            shopName: obj.params.shopName,
                            shopPic: obj.newPicName,
                            upTime: Date.now()
                        }
                    }, function(err, shopTypeList) {
                        res.json({
                            ok: 1,
                            msg: '更新成功'
                        })
                    })
                })
            })
        } else {
            res.json({
                ok: 2,
                msg: obj.msg
            })
        }
    })
})
app.delete('/delShop', function(req, res) {
    var id = req.query.id;
    db.findOne('shopList', {
        _id: mongodb.ObjectId(id)
    }, function(err, obj) {
        fs.unlink('./upload/' + obj.shopPic, function(err, results) {
            db.deleteOneById('shopList', id, function(err, results) {
                res.json({
                    ok: 1,
                    msg: '删除成功'
                })
            })
        })
    })
})
app.get('/getShop', function(req, res) {
    db.find('shopList', {
        sortObj: {
            createTime: -1
        }
    }, function(err, shopList) {
        res.json({
            ok: 1,
            shopList
        })
    })
})
app.post('/addGoodsType', function(req, res) {
    db.insertOne('goodsTypeList', {
        goodsTypeName: req.body.goodsTypeName,
        shopId: mongodb.ObjectId(req.body.shopId),
        createTime: Date.now(),
        upTime: Date.now(),
    }, function(err, results) {
        res.json({
            ok: 1,
            msg: '添加成功'
        })
    })
})
app.get('/getGoodsTypeList', function(req, res) {
    var pageIndex = req.query.pageIndex;
    var keyword = req.query.keyword;
    var i = {};
    if (keyword) {
        i.goodsTypeName = { $regex: keyword }
    }
    var pageSum = 1;
    var pageNum = 5;
    db.count('goodsTypeList', i, function(count) {
        pageSum = Math.ceil(count / pageNum);
        if (pageSum < 1) {
            pageSum = 1
        };
        if (pageIndex > pageSum) {
            pageIndex = pageSum
        }
        db.goodsTypeInfo({
            skipNum: (pageIndex - 1) * pageNum,
            limitNum: pageNum
        }, function(err, goodsTypeList) {
            res.json({
                ok: 1,
                goodsTypeList,
                pageSum: pageSum
            })
        })
    })
})
app.get('/getGoodsType', function(req, res) {
    var shopId = mongodb.ObjectId(req.query.shopId);
    db.find('goodsTypeList', {
        whereObj: {
            shopId: shopId
        },
        sortObj: {
            createTime: -1
        }
    }, function(err, goodsTypeList) {
        res.json({
            ok: 1,
            goodsTypeList
        })
    })
})
app.post('/addGoods', function(req, res) {
    upPic.upPic(req, 'goodsPic', function(obj) {
        if (obj.ok == 1) {
            db.insertOne('goodsList', {
                goodsName: obj.params.goodsName,
                price:obj.params.price,
                shopId: mongodb.ObjectId(obj.params.shopId),
                goodsTypeId: mongodb.ObjectId(obj.params.goodsTypeId),
                goodsPic: obj.newPicName,
                isHot: obj.params.isHot,
                goodsNum: obj.params.goodsNum,
                createTime: Date.now(),
                upTime: Date.now(),
            }, function(err, results) {
                res.json({
                    ok: 1,
                    msg: '添加商品成功'
                })
            })
        } else {
            res.json({
                ok: 2,
                msg: 'obj.msg'
            })
        }
    })
})
app.get('/getGoodsList', function(req, res) {
    var pageIndex = req.query.pageIndex;
    var keyword = req.query.keyword;
    var i = {};
    if (keyword) {
        i.goodsName = { $regex: keyword }
    }
    var pageSum = 1;
    var pageNum = 5;
    db.count('goodsList', i, function(count) {
        pageSum = Math.ceil(count / pageNum);
        if (pageSum < 1) {
            pageSum = 1
        };
        if (pageIndex > pageSum) {
            pageIndex = pageSum
        }
        db.goodsInfo({
            skipNum: (pageIndex - 1) * pageNum,
            limitNum: pageNum
        }, function(err, goodsList) {
            console.log(err,goodsList)
            res.json({
                ok: 1,
                goodsList,
                pageSum: pageSum
            })
        })
    })
})
app.post('/addAdv', function(req, res) {
    upPic.upPic(req, 'advPic', function(obj) {
        if (obj.ok == 1) {
            db.insertOne('advList', {
                advName: obj.params.advName,
                advTypeId: obj.params.advTypeId,
                advAddress: obj.params.advAddress,
                orderNum: obj.params.orderNum,
                advPic: obj.newPicName,
                advStartTime: obj.params.advStartTime,
                advOverTime: obj.params.advOverTime,
                createTime: Date.now(),
                upTime: Date.now(),
            }, function(err, results) {
                res.json({
                    ok: 1,
                    msg: '添加商品成功'
                })
            })
        } else {
            res.json({
                ok: 2,
                msg: '添加失败'
            })
        }
    })
})
app.get('/getAdvList', function(req, res) {
    var pageIndex = req.query.pageIndex;
    var keyword = req.query.keyword;
    var i = {};
    if (keyword) {
        i.advName = { $regex: keyword }
    }
    var pageSum = 1;
    var pageNum = 5;
    db.count('advList', i, function(count) {
        pageSum = Math.ceil(count / pageNum);
        if (pageSum < 1) {
            pageSum = 1
        };
        if (pageIndex > pageSum) {
            pageIndex = pageSum
        }
        db.find('advList', {
            sortObj: {
                createTime: -1
            },
            skipNum: (pageIndex - 1) * pageNum,
            limitNum: pageNum
        }, function(err, advList) {
            res.json({
                ok: 1,
                advList,
                pageSum: pageSum
            })
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
});
//客户端
app.get('/shopType', function(req, res) {
    db.find('shopTypeList', {}, function(err, results) {
        var num = Math.ceil(results.length / 10);
        var shopTypeList = [];
        for (var i = 0; i < num; i++) {
            shopTypeList.push(results.slice(i * 10, (i + 1) * 10));
        }
        res.json({
            ok: 1,
            shopTypeList
        })
    })
})
app.get('/getAdv', function(req, res) {
    db.find('advList', {
        whereObj: {
            advTypeId: req.query.advTypeId
        }
    }, function(err, advList) {
        res.json({
            ok: 1,
            advList
        })
    })
})
app.get('/getShopInfo', function(req, res) {
    db.findOneById('shopList', req.query.shopId, function(err, shopInfo) {
        if (!err) {
            res.json({
                ok: 1,
                shopInfo
            })
        }
    })
})
app.get('/getGoods',function(req,res){
    var shopId = mongodb.ObjectId(req.query.shopId);
    var goodsList={};
    db.find('goodsTypeList',{
        whereObj:{
            shopId
        }
    },function(err,results){
        for(let i=0;i<results.length;i++){
            db.find('goodsList',{
                whereObj:{
                    goodsTypeId:mongodb.ObjectId(results[i]._id)
                }
            },function(err,goods){
                goodsList[results[i].goodsTypeName] = goods
                if(i==results.length-1){
                        res.json({
                        ok:1,
                        goodsList
                    })
                }
            })
        }
    })
})
app.post('/userLogin',function(req,res){
    var phoneId = req.body.phoneId
    db.findOne('userList',{
        phoneId
    },function(err,results){
        if(results){
            res.json({
                ok:1,
                results,
                msg:'登陆成功'
            })
        }else{
            db.insertOne('userList',{
                phoneId:phoneId,
                createTime:Date.now(),
                goldNum:9999
            },function(err,results){
                res.json({
                    ok:1,
                    results:{
                        phoneId:phoneId,
                        goldNum:9999                        
                    },
                    msg:'注册成功'
                })
            })
        }
    })
})
app.get('/getCarList',function(req,res){
    db.getCarInfo({
        phoneId:req.query.phoneId,
        shopId:mongodb.ObjectId(req.query.shopId)   
    },function(err,carList){
        res.json({
            ok:1,
            carList
        })
    })
})
app.post('/addCar',function(req,res){
    var phoneId = req.body.phoneId;
    var shopId = mongodb.ObjectId(req.body.shopId);
    var goodsId = mongodb.ObjectId(req.body.goodsId);
    db.find('goodsList',{
        whereObj:{
            _id:goodsId
        }
    },function(err,goodsInfo){
        var price = goodsInfo[0].price;        
        db.find('carList',{
            whereObj:{
                phoneId:phoneId,
                shopId:shopId,
                goodsId:goodsId
            }        
        },function(err,carList){
            if(carList.length!=0){
                db.updateOne('carList',{
                    phoneId:phoneId,
                    shopId:shopId,
                    goodsId:goodsId
                },{
                    $inc:{
                        buyNum:1
                    }
                },function(err){
                    res.json({
                        ok:1
                    })
                })
            }else{
                db.insertOne('carList',{
                    phoneId:phoneId,
                    shopId:shopId,
                    goodsId:goodsId,
                    buyNum:1,
                    price,
                    createTime:Date.now()
                },function(err,results){
                    res.json({
                        ok:1
                    })
                })
            }
        })
    })    
})
app.post('/subCar',function(req,res){
    var phoneId = req.body.phoneId;
    var goodsId = mongodb.ObjectId(req.body.goodsId);
    var shopId = mongodb.ObjectId(req.body.shopId);
    db.find('carList',{
        whereObj:{
            phoneId,
            goodsId,
            shopId
        }
    },function(err,results){
        if(results[0].buyNum<=1){
            db.deleteOneById('carList',results[0]._id,function(err){
                res.json({
                    ok:1
                })
            })
        }else{
            db.updateOneById('carList',results[0]._id,{
                $inc:{
                    buyNum:-1
                }
            },function(err){
                res.json({
                    ok:1
                })
            })
        }
        
    })
})
app.post('/buy',function(req,res){
    db.insertOne('ordersList',{
        phoneId:req.body.phoneId,
        shopId:req.body.shopId,
        total:req.body.total,
        goodsNum:req.body.goodsNum,
        createTime:Date.now(),
        list:req.body.list
    },function(err){
        db.updateOne('userList',{
            phoneId:req.body.phoneId
        },{
            $inc:{
                goldNum: -req.body.total
            }
        },function(err){
            if(!err){
                res.json({
                    ok:1
                })
            }
        }) 
    })
})
app.get('/getOrders',function(req,res){
    db.find('ordersList',{
        whereObj:{
            phoneId:req.query.phoneId
        },
        sortObj:{
            createTime:-1
        }
    },function(err,ordersList){
        res.json({
            ok:1,
            ordersList
        })
    })
})
app.get('/getUserInfo',function(req,res){
    db.find('userList',{
        whereObj:{
            phoneId:req.query.phoneId
        }
    },function(err,userInfo){
        res.json({
            ok:1,
            userInfo
        })
    })
})
app.listen(80, function() {
    console.log('success');
})