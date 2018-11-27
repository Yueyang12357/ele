<template>
    <div>
        <el-form :inline="true"  class="demo-form-inline">
            <el-form-item>
                <el-input v-model="keyword" placeholder='搜索商品'></el-input>                
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getGoodsList">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="goodsVisible = true">添加商品</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="goodsList" style="width: 100%">
            <el-table-column prop="_id" label="ID">
            </el-table-column>
            <el-table-column prop="goodsName" label="商品名称">
            </el-table-column>
            <el-table-column prop="shopInfo[0].shopName" label="商铺名称">
            </el-table-column>
            <el-table-column prop="goodsTypeInfo[0].goodsTypeName" label="商品类别名称">
            </el-table-column>
            <el-table-column label="图片">
                <template slot-scope="scope">
                    <img width="50" :src="scope.row.goodsPic | imgUrl" alt="">
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
                        <el-button size="mini" type="primary" icon="el-icon-edit"  @click="goodsUpdate(scope.row._id)" round></el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" @click="delGoods(scope.row._id)" round></el-button>
                    </el-button-group>
                </template>                
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :page-count='pageSum' :current-page.sync='pageIndex' @current-change='getGoodsList'>            
        </el-pagination>
        <goodsDialog v-if="goodsVisible" :goodsVisible.sync="goodsVisible"></goodsDialog>
    </div>
</template>

<script>
import goodsDialog from '@/components/goods/goodsDialog';

export default {
    name:'goods-manage',
    data(){
        return {
            goodsList:[],
            pageIndex:1,
            pageSum:1,
            keyword:'',
            goodsVisible:false
        }
    },
    components:{
        goodsDialog
    },
    methods:{
        getGoodsList(pageIndex){
            this.$ajax.get('/getGoodsList',{
                params:{
                    pageIndex:this.pageIndex,
                    keyword:this.keyword
                }
            })
                .then(data=>{
                    this.goodsList=data.goodsList;
                    this.pageSum=data.pageSum;
                    console.log(data)
                })
        },
        delGoods(){

        },
        goodsUpdate(){

        }
    },
    mounted(){
        this.getGoodsList(1)
    }
}
</script>

<style scoped>
    .el-form{
        margin-top: 20px;
    }
</style>