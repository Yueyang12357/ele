<template>
    <div>
        <el-form :inline="true"  class="demo-form-inline">
            <el-form-item>
                <el-input v-model="keyword" placeholder='搜索店铺类别'></el-input>                
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getShopTypeList">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addShopType">添加店铺类别</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="shopTypeList" style="width: 100%">
            <el-table-column prop="_id" label="ID">
            </el-table-column>
            <el-table-column prop="shopTypeName" label="类别名称">
            </el-table-column>
            <el-table-column label="图片">
                <template slot-scope="scope">
                    <img width="50" src="" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间">
            </el-table-column>
            <el-table-column prop="upTime" label="更新时间">                
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button-group>
                        <el-button size="mini" type="primary" icon="el-icon-edit" round></el-button>
                        <el-button size="mini" type="success" icon="el-icon-circle-plus" @click="addShopType" title="添加店铺" round></el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" @click="delShopType" round></el-button>
                    </el-button-group>
                </template>                
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :page-count='pageSum' :current-page.sync='pageIndex' @current-change='getShopTypeList'>            
        </el-pagination>
    </div>
</template>

<script>
export default {
    name:'shop-type',
    data(){
        return {
            pageIndex:1,
            keyword:'',
            shopTypeList:[{
                _id:1,
                shopTypeName:'233',
                createTime:'23232323',
                upTime:5555,
                shopTypePic:''
            }]
            
        }
    },
    methods:{
        getShopTypeList(pageIndex){

        },
        addShopType(){
            var formdata = new FormData();
            // formdata.set('')
        },
        delShopType(){

        }
    },
    mounted(){

    }
}
</script>
<style lang="scss" scoped>
    .el-form{
        margin-top: 20px;
    }
</style>


<style scoped>
    
</style>