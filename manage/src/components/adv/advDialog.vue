<template>
    <div>
        <div>
        <el-dialog title="添加广告" :visible="advVisible" @update:visible="v=>$emit('update:advVisible',false)">
            <el-form>
                <el-form-item label="广告名称" label-width="120px">
                    <el-input ref="advName" autocomplete="off" placeholder="请输入广告名称"></el-input>
                </el-form-item>
                <el-form-item label="广告地址" label-width="120px">
                    <el-input ref="advAddress" autocomplete="off" placeholder="请输入广告地址"></el-input>
                </el-form-item>
                <el-form-item label="广告等级" label-width="120px">
                    <el-input ref="orderNum" autocomplete="off" placeholder="请输入广告等级"></el-input>
                </el-form-item>
                <el-form-item label="广告类别" label-width="120px">
                    <el-select placeholder="请选择" v-model="advTypeId">
                        <el-option value="1" label="banner">banner</el-option>
                        <el-option value="2" label="activityAdv">activityAdv</el-option>
                        <el-option value="3" label="other">other</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动时间" label-width="120px">
                    <el-col :span="6">
                        <el-date-picker type="date" placeholder="起始日期" v-model="date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="6">
                        <el-date-picker type="date" placeholder="结束日期" v-model="date2" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="广告图片" label-width="120px">
                    <el-upload class="upload-demo" action=""  :limit="1" ref="upload" :auto-upload="false" :on-exceed="warn">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="$emit('update:advVisible',false)">取 消</el-button>
                <el-button type="primary" class="submit-btn" @click="addAdv">确 定</el-button>
            </div>
        </el-dialog>
    </div>
    </div>
</template>

<script>
export default {
    name:'adv-dialog',
    props:["advVisible","advId","getAdvList"],
    data(){
        return {
            advList:[],
            pageIndex:1,
            pageSum:1,
            advTypeId:[1,2,3,4],
            date1:'',
            date2:''
        }        
    },
    methods:{
        warn(){
            this.$message({
                message: '只能上传一张图片哦',
                type: 'warning'
            });
        },
        addAdv(){
            var formData = new FormData();
            formData.set('advName',this.$refs.advName.currentValue);
            formData.set('advAddress',this.$refs.advAddress.currentValue);
            formData.set('orderNum',this.$refs.orderNum.currentValue);
            formData.set('advTypeId',this.advTypeId);
            formData.set('advStartTime',this.date1);
            formData.set('advOverTime',this.date2);
            formData.set('advPic',document.querySelector('.el-upload__input').files[0]);
            this.$ajax.post('/addAdv',formData)
                .then(data=>{
                    if(data.ok===1){
                        this.$message({
                            message: data.msg,
                            type: 'seccuss'
                        });
                        this.getAdv(1)
                        this.$emit('update:advVisible',false)
                    }
                })
        }
    },
    mounted(){
        this.getAdv=this.getAdvList
    }
}
</script>

<style scoped>
    
</style>