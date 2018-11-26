<template>
    <div>
        <el-dialog :title="isModify?'修改店铺类别':'添加店铺类别'" :visible="dialogFormVisible" @update:visible="v=>$emit('update:dialogFormVisible',false)">
            <el-form>
                <el-form-item label="店铺类别名称" label-width="120px">
                    <el-input ref="shopTypeName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="店铺类别图片" label-width="120px">
                    <el-upload class="upload-demo" action=""  :limit="1" ref="upload" :auto-upload="false" :on-exceed="warn">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="$emit('update:dialogFormVisible',false)">取 消</el-button>
                <el-button type="primary" class="submit-btn" @click="addShopType">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:'shop-type-dialog',
    props:["dialogFormVisible","getShopTypeList","isModify","shopTypeId"],
    data(){
        return {
            
        }
    },
    methods:{
        warn(){
            this.$message({
                message: '只能上传一张图片哦',
                type: 'warning'
            });
        },
        addShopType(){
            var formdata = new FormData();
            formdata.set('shopTypeName',this.$refs.shopTypeName.$data.currentValue);
            formdata.set('shopTypePic',document.querySelector('.el-upload__input').files[0]);
            if(this.shopTypeId.length>0){
                formdata.set('shopTypeId',this.shopTypeId)
                this.$ajax.put('/updateShopType',formdata)
                .then(data=>{
                    this.$refs.upload.clearFiles();
                    this.$refs.shopTypeName.$data.currentValue='';
                    if(data.ok===1){
                        this.$message({
                            message:data.msg,
                            type:'success'
                        })
                        this.closeDialog();
                    }else{
                        this.$message.error(data.msg)
                    }

                    this.getShopTypeList(1)
                })
            }else{
                this.$ajax.post('/addShopType',formdata)
                .then(data=>{
                    this.$refs.upload.clearFiles();
                    this.$refs.shopTypeName.$data.currentValue='';
                    if(data.ok===1){
                        this.$message({
                            message:data.msg,
                            type:'success'
                        })
                        this.closeDialog();
                    }else{
                        this.$message.error(data.msg)
                    }
                    this.getShopTypeList(1)
                })
            }            
        },
        closeDialog(){
            this.$emit('update:isModify',false);
            this.$emit('update:dialogFormVisible',false);
        }
    },
    mounted(){
        
    }
}
</script>

<style scoped>
    .el-input{
        width: 150px;
    }
</style>