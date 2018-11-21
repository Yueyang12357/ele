<template>
    <div>
        <el-form :inline="true"  class="demo-form-inline">
            <el-form-item>
                <el-input v-model="keyword" placeholder='搜索详情'></el-input>                
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getAdminLog">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="adminLogList" stripe style="width: 100%" v-loading='loading'>
            <el-table-column prop='_id' label="id" >
            </el-table-column>
            <el-table-column prop="adminName" label="管理员">
            </el-table-column>
            <el-table-column prop="detail" label="详情">
            </el-table-column>
            <el-table-column label="时间">
                <template slot-scope='scope'>
                    {{scope.row.addTime | date}}
                </template>
            </el-table-column>
            <el-table-column label="类型">
                <template slot-scope='scope'>
                    {{logTypeEnum[scope.row.logType]}}
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :page-count='pageSum' :current-page.sync='pageIndex' @current-change='getAdminLog'>            
        </el-pagination>
    </div>    
</template>

<script>
export default {
    name:'admin-log',
    data(){
        return {
            loading:false,
            adminLogList:[],
            logTypeEnum:{},
            pageSum:1,
            pageIndex:1,
            keyword:''
        }
    },
    methods:{
        getAdminLog(pageIndex){
            this.loading=true;
            this.$ajax.get('/getAdminLog',{
                params:{
                    pageIndex,
                    keyword:this.keyword
                }
            }).then(data=>{
                this.loading=false;
                this.adminLogList = data.adminLogList;
                this.logTypeEnum = data.logTypeEnum;
                this.pageSum =data.pageSum
            })
        }
    },
    mounted(){
        this.getAdminLog(1);
    }
}
</script>

<style lang='scss' scoped>
    .el-form{
        margin-top: 20px;
        .el-input{
            width: 200px;
        }
    }
</style>