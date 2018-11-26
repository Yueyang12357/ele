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
                <el-button type="primary" @click="dialogFormVisible = true">添加店铺类别</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="shopTypeList" style="width: 100%">
            <el-table-column prop="_id" label="ID">
            </el-table-column>
            <el-table-column prop="shopTypeName" label="类别名称">
            </el-table-column>
            <el-table-column label="图片">
                <template slot-scope="scope">
                    <img width="50" :src="scope.row.shopTypePic | imgUrl" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间">
                <template slot-scope="scope">
                    {{scope.row.createTime | date}}
                </template>
            </el-table-column>
            <el-table-column prop="upTime" label="更新时间">
                <template slot-scope="scope">
                    {{scope.row.upTime | date}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button-group>
                        <el-button size="mini" type="primary" icon="el-icon-edit"  @click="modify(scope.row._id)" round></el-button>
                        <el-button size="mini" type="success" icon="el-icon-circle-plus" @click="addShop(scope.row._id)" title="添加店铺"></el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" @click="delShopType(scope.row._id)" round></el-button>
                    </el-button-group>
                </template>                
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :page-count='pageSum' :current-page.sync='pageIndex' @current-change='getShopTypeList'>            
        </el-pagination>
        <shopTypeDialog :dialogFormVisible.sync="dialogFormVisible" :getShopTypeList.sync="getShopTypeList" :shopTypeId.sync="shopTypeId" :isModify.sync="isModify"></shopTypeDialog>
        <shopDialog v-if="shopVisible" :shopVisible.sync="shopVisible" :typeId="typeId"></shopDialog>
    </div>
</template>

<script>
import shopTypeDialog from '@/components/shop/shopTypeDialog'
import shopDialog from '@/components/shop/shopDialog'

export default {
    name:'shop-type',
    data(){
        return {
            pageIndex:1,
            pageSum:1,
            keyword:'',
            shopTypeList:[],
            dialogFormVisible:false,
            shopVisible:false,
            isModify:false,
            typeId:'',
            shopTypeName:'',
            shopTypeId:''
        }
    },
    components:{
        shopTypeDialog,
        shopDialog
    },
    methods:{
        getShopTypeList(pageIndex){
            this.$ajax.get('/getShopTypeList',{
                params:{
                    pageIndex,
                    keyword:this.keyword
                }
            }).then(data=>{
                this.loading=false;
                this.shopTypeList = data.shopTypeList;
                this.pageSum =data.pageSum;
            })
        },
        modify(id){
            this.dialogFormVisible = true;
            this.shopTypeId=id;
            this.isModify=true;
        },
        delShopType(id){
            this.$ajax.delete('/delshopType',{
                params:{
                    id
                }
            }).then(data=>{
                if(data.ok===1){
                    this.$message({
                        message:data.msg,
                        type:'success'
                    })
                    this.getShopTypeList(1);
                }
            })
        },
        addShop(id){
            this.shopVisible=true;
            this.typeId=id
        }
    },
    mounted(){
        this.getShopTypeList(1)
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