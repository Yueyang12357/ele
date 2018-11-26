<template>
    <div>
        <el-dialog :title="shopId?'添加店铺':'修改店铺'" :visible="shopVisible" @update:visible="v=>$emit('update:shopVisible',false)">
            <el-form>
                <el-form-item label="店铺名称" label-width="120px">
                    <el-input ref="shopName" autocomplete="off" placeholder="请输入店铺名称"></el-input>
                </el-form-item>
                <el-form-item label="店铺类别" label-width="120px">
                    <el-select placeholder="请选择" v-model="shopTypeId" >
                        <el-option v-for="item in shopTypeList" :label="item.shopTypeName" :value="item._id" :key="item._id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="店铺图片" label-width="120px">
                    <el-upload class="upload-demo" action=""  :limit="1" ref="upload" :auto-upload="false" :on-exceed="warn">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="$emit('update:shopVisible',false)">取 消</el-button>
                <el-button type="primary" class="submit-btn" @click="addShop">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:'shop-dialog',
    props:["shopVisible","typeId","shopId","getShopList"],
    data(){
        return {
           shopTypeList:[],
           shopTypeId:''
        }
    },
    methods:{
        warn(){
            this.$message({
                message: '只能上传一张图片哦',
                type: 'warning'
            });
        },
        addShop(){
            var formData = new FormData();
            formData.set('shopName',this.$refs.shopName.currentValue);
            formData.set('shopTypeId',this.shopTypeId);
            formData.set('shopPic',document.querySelector('.el-upload__input').files[0]);
            if(this.shopId.length>0){
                formData.set('shopId',this.shopId)
                this.$ajax.put('/updateShop',formData)
                    .then(data=>{
                    if(data.ok===1){
                            this.$emit('update:shopVisible',false);
                            this.getShopList(1);
                            this.$router.push('/shopManage');
                        }
                    })
            }else{
                this.$ajax.post('/addShop',formData)
                .then(data=>{
                    if(data.ok===1){
                        this.$emit('update:shopVisible',false);
                        this.getShopList(1);
                        this.$router.push('/shopManage');
                    }                    
                })
            }            
        },
        getShopType(){
            this.$ajax.get('/getShopType')
                .then(data=>{
                    this.shopTypeList = data.shopTypeList
                })
        }
    },
    mounted(){
        this.getShopType();
        if(this.typeId){
            this.shopTypeId=this.typeId
        }
    }
}
</script>

<style scoped>
    .el-input{
        width: 150px;
    }
</style>