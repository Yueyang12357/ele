<template>
    <div>
        <el-form :inline="true"  class="demo-form-inline">
            <el-form-item>
                <el-input v-model="keyword" placeholder='搜索店铺'></el-input>                
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getShopList">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="shopVisible = true">添加店铺</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="shopList" style="width: 100%">
            <el-table-column prop="_id" label="ID">
            </el-table-column>
            <el-table-column prop="shopName" label="店铺名称">
            </el-table-column>
            <el-table-column prop="shopType" label="店铺类别">
            </el-table-column>
            <el-table-column label="图片">
                <template slot-scope="scope">
                    <img width="50" :src="scope.row.shopPic | imgUrl" alt="">
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
                        <el-button size="mini" type="primary" icon="el-icon-edit"  @click="shopUpdate(scope.row._id)" round></el-button>
                        <el-button size="mini" type="success" icon="el-icon-circle-plus" @click="addGoodsType(scope.row._id)" title="添加商品类别"></el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" @click="delShop(scope.row._id)" round></el-button>
                    </el-button-group>
                </template>                
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :page-count='pageSum' :current-page.sync='pageIndex' @current-change='getShopList'>            
        </el-pagination>
        <shopDialog v-if="shopVisible" :shopVisible.sync="shopVisible" :getShopList.sync="getShopList" :shopId="shopId"></shopDialog>
        <goodsTypeDialog v-if="goodsTypeVisible" :goodsTypeVisible.sync="goodsTypeVisible" :id="shopId"></goodsTypeDialog>
    </div>
</template>

<script>
import shopDialog from '@/components/shop/shopDialog';
import goodsTypeDialog from '@/components/goods/goodsTypeDialog';

export default {
    name:'shop-manage',
    data(){
        return {
            shopList:[],
            pageSum:1,
            pageIndex:1,
            shopId:'',
            keyword:'',
            shopVisible:false,
            goodsTypeVisible:false
        }
    },
    components:{
        shopDialog,
        goodsTypeDialog
    },
    methods:{
        shopUpdate(id){
            this.shopVisible=true;
            this.shopId=id
        },
        getShopList(pageIndex){
            this.$ajax.get('/getShopList',{
                params:{
                    keyword:this.keyword,
                    pageIndex:this.pageIndex
                }
            }).then(data=>{
                this.shopList = data.shopList
                this.pageSum = data.pageSum
            })
        },
        addGoodsType(id){
            this.goodsTypeVisible=true;
            this.shopId=id
        },
        delShop(id){
            this.$ajax.delete('/delShop',{
                params:{
                    id
                }
            }).then(data=>{
                if(data.ok===1){
                    this.$message({
                        message:data.msg,
                        type:'success'
                    })
                    this.getShopList(1);
                }
            })
        }
    },
    mounted(){
        this.getShopList(1)
    }
}
</script>

<style scoped>
    .el-form{
        margin-top: 20px;
    }
</style>