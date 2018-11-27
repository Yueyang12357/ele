<template>
    <el-container>
        <el-header>
            <el-row>
                <el-col :span="4" :style="{width:isCollapse?'70px':''}">
                    <span v-show="!isCollapse">饿了么管理系统</span>
                    <span v-show="isCollapse"><i class='iconfont icon-changyonglogo40'></i></span>
                </el-col>
                <el-col :span="4">
                    <i :class="isCollapse?'el-icon-arrow-right':'el-icon-arrow-left'" @click="isCollapse=!isCollapse"></i>
                </el-col>
                <el-col :span="16">
                    <img src="../static/images/1.jpg" alt="">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            admin001
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <span @click="$store.commit('OUT_LOGIN')">退出账号</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-container>
                <el-aside :style="{width:isCollapse?'auto':'210px'}">
                    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse">
                        <el-menu-item index="1">
                            <i class="el-icon-menu"></i>
                            <span slot="title" @click="$router.push('/')">查看日志</span>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span slot="title" @click="$router.push('/shopType')">店铺类别管理</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-menu"></i>
                            <span slot="title" @click="$router.push('/shopManage')">店铺管理</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-menu"></i>
                            <span slot="title" @click="$router.push('/goodsTypeManage')">商品类别管理</span>
                        </el-menu-item>
                        <el-menu-item index="5">
                            <i class="el-icon-menu"></i>
                            <span slot="title" @click="$router.push('/goodsManage')">商品管理</span>
                        </el-menu-item>
                        <el-menu-item index="6">
                            <i class="el-icon-menu"></i>
                            <span slot="title" @click="$router.push('/advManage')">广告管理</span>
                        </el-menu-item>
                        <el-menu-item index="7">
                            <i class="el-icon-menu"></i>
                            <span slot="title" @click="$router.push('/userManage')">用户管理</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name:'ele',
    data(){
        return {
            isCollapse:false
        }
    },
    methods: {
      
    },
    mounted(){
    }
}
</script>

<style lang="scss">
@import '../static/sass/index.scss';

.el-container{
    width: 100%;
    height: 100%;
}
.el-header{
    width: 100%;
    padding: 0;
    line-height: 60px;
    color: #fff;
    background-color: #0af;
    .el-row{
        width: 1200px;
        margin: 0 auto;
        .el-col:nth-of-type(1){
            font-size: 24px;
        }
        .el-col:nth-of-type(3){
            float: right;
            text-align: right;
            img{
                width: 40px;
                height: 40px;
                vertical-align: middle;
                border-radius: 50%;
            }
            .el-dropdown-link{
                color: #fff;
            }
        }
        i.iconfont{
            font-size: 60px;
            font-weight: bold;
        }
    }    
}
.el-main{
    width: 100%;
    height: 100%;
    padding: 0;
    background-color: #fff;
    .el-container{
        width: 1200px;
        margin: 0 auto;
        .el-aside{
            height: 100%;
            margin-right: 20px;
            .el-menu-vertical-demo:not(.el-menu--collapse) {
                width: 200px;
                height: 100%;
            }
        };
        .el-main{
            height: 100%;
        }
    }    
}
</style>
<style scoped>
@import '../static/font/iconfont.css';
</style>
