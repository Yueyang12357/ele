<template>
    <div>
        <el-form :inline="true"  class="demo-form-inline">
            <el-form-item>
                <el-input v-model="keyword" placeholder='搜索广告'></el-input>                
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getAdvList">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="advVisible = true">添加广告</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="advList" style="width: 100%">
            <el-table-column prop="_id" label="ID">
            </el-table-column>
            <el-table-column prop="advName" label="广告名称">
            </el-table-column>
            <el-table-column prop="orderNum" label="广告排序">
            </el-table-column>
            <el-table-column prop="advTypeId" label="广告类别名称">
            </el-table-column>
            <el-table-column label="图片">
                <template slot-scope="scope">
                    <img width="50" :src="scope.row.advPic | imgUrl" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="advStartTime" label="开始时间">
                <template slot-scope="scope">
                    {{scope.row.advStartTime | date}}
                </template>
            </el-table-column>
            <el-table-column prop="advOverTime" label="结束时间">
                <template slot-scope="scope">
                    {{scope.row.advOverTime | date}}
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
                        <el-button size="mini" type="primary" icon="el-icon-edit"  @click="updateAdv(scope.row._id)" round></el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" @click="delAdv(scope.row._id)" round></el-button>
                    </el-button-group>
                </template>                
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :page-count='pageSum' :current-page.sync='pageIndex' @current-change='getAdvList'>            
        </el-pagination>
        <advDialog v-if="advVisible" :advVisible.sync="advVisible" :advId="advId" :getAdvList="getAdvList"></advDialog>
    </div>
</template>

<script>
import advDialog from '@/components/adv/advDialog'

export default {
    name:'adv-manage',
    data(){
        return {
            advVisible:false,
            advList:[],
            pageIndex:1,
            pageSum:1,
            keyword:'',
            advId:''
        }
    },
    components:{
        advDialog
    },
    methods:{
        getAdvList(){
            this.$ajax.get('/getAdvList',{
                params:{
                    pageIndex:this.pageIndex,
                    keyword:this.keyword
                }
            })
                .then(data=>{
                    if(data.ok===1){
                        this.advList=data.advList;
                        this.pageSum=data.pageSum
                    }
                })
        },
        delAdv(){

        },
        updateAdv(id){
            this.advVisible=false;
            this.advId = id
        }
    },
    mounted(){
        this.getAdvList(1)
    }
}
</script>

<style scoped>
    .el-form{
        margin-top: 20px;
    }
</style>