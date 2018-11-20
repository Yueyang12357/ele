<template>
    <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop='date' label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    name:'admin-log',
    data(){
        return {
            loading:false
        }
    },
    methods:{
        getAdminLog(){
            this.loading=true;
            this.$ajax.get('getAdminLog',{
                params:{
                    
                }
            })
        }
    }
}
</script>

<style scoped>
    
</style>