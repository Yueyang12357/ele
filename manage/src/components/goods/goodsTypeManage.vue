<template>
    <div>
        <el-form :inline="true"  class="demo-form-inline">
            <el-form-item>
                <el-input v-model="keyword" placeholder='搜索商品类别'></el-input>                
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getGoodsTypeList">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="goodsTypeVisible = true">添加商品类别</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="goodsTypeList" style="width: 100%">
            <el-table-column prop="_id" label="ID">
            </el-table-column>
            <el-table-column prop="goodsTypeName" label="商品类别名称">
            </el-table-column>
            <el-table-column prop="shopInfo[0].shopName" label="商铺名称">
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
                        <el-button size="mini" type="primary" icon="el-icon-edit"  @click="goodsTypeUpdate(scope.row._id)" round></el-button>
                        <el-button size="mini" type="success" icon="el-icon-circle-plus" @click="addGoods(scope.row._id,scope.row.shopId)" title="添加商品"></el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" @click="delShopType(scope.row._id)" round></el-button>
                    </el-button-group>
                </template>                
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :page-count='pageSum' :current-page.sync='pageIndex' @current-change='getGoodsTypeList'>            
        </el-pagination>
        <goodsDialog v-if="goodsVisible" :goodsVisible.sync="goodsVisible" :typeId="typeId" :id="shopId"></goodsDialog>
        <goodsTypeDialog v-if="goodsTypeVisible" :goodsTypeVisible.sync="goodsTypeVisible"></goodsTypeDialog>
    </div>
</template>

<script>
import goodsTypeDialog from '@/components/goods/goodsTypeDialog';
import goodsDialog from '@/components/goods/goodsDialog';

export default {
    name:'goods-type',
    data(){
        return {
            goodsTypeList:[],
            pageIndex:1,
            pageSum:1,
            keyword:'',
            goodsTypeVisible:false,
            goodsVisible:false,
            shopId:'',
            typeId:''
        }
    },
    components:{
        goodsDialog,
        goodsTypeDialog
    },
    methods:{
        getGoodsTypeList(pageIndex){
            this.$ajax.get('/getGoodsTypeList',{
                params:{
                    keyword:this.keyword,
                    pageIndex:this.pageIndex
                }
            }).then(data=>{
                if(data.ok===1){
                    this.goodsTypeList=data.goodsTypeList;
                    this.pageSum=data.pageSum
                }
            })
        },
        goodsTypeUpdate(){

        },
        addGoods(id,shopId){
            this.typeId=id;
            this.shopId=shopId;
            this.goodsVisible=true
        },
        delShopType(){

        }
    },
    mounted(){
        this.getGoodsTypeList(1)
    }
}
</script>

<style scoped>
    .el-form{
        margin-top: 20px;
    }
</style>