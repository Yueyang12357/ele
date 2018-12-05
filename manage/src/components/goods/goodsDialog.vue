<template>
    <div>
        <el-dialog title="添加商品" :visible="goodsVisible" @update:visible="v=>$emit('update:goodsVisible',false)">
            <el-form>
                <el-form-item label="商品名称" label-width="120px">
                    <el-input ref="goodsName" autocomplete="off" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" label-width="120px">
                    <el-input ref="price" autocomplete="off" placeholder="请输入商品价格"></el-input>
                </el-form-item>
                <el-form-item label="店铺名称" label-width="120px">
                    <el-select placeholder="请选择" v-model="shopId" @change="getGoodsTypeList">
                        <el-option v-for="item in shopList" :label="item.shopName" :value="item._id" :key="item._id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品类别" label-width="120px">
                    <el-select placeholder="请选择" v-model="goodsTypeId" >
                        <el-option v-for="item in goodsTypeList" :label="item.goodsTypeName" :value="item._id" :key="item._id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否热销" label-width="120px">
                    <el-radio-group v-model="isHot">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="商品数量" label-width="120px">
                    <el-input ref="goodsNum" autocomplete="off" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item label="商品图片" label-width="120px">
                    <el-upload class="upload-demo" action=""  :limit="1" ref="upload" :auto-upload="false" :on-exceed="warn">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="$emit('update:goodsVisible',false)">取 消</el-button>
                <el-button type="primary" class="submit-btn" @click="addGoods">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:'goods-dialog',
    props:["goodsVisible","typeId","id"],
    data(){
        return {
            shopList:[],
            goodsTypeList:[],
            goodsTypeId:'',
            isHot:'',
            shopId:''
        }
    },
    methods:{
        warn(){
            this.$message({
                message: '只能上传一张图片哦',
                type: 'warning'
            });
        },
        addGoods(){
            var formData = new FormData();
            formData.set('goodsName',this.$refs.goodsName.currentValue);
            formData.set('price',this.$refs.price.currentValue);
            formData.set('shopId',this.shopId);
            formData.set('goodsTypeId',this.goodsTypeId);
            formData.set('isHot',this.isHot);
            formData.set('goodsNum',this.$refs.goodsNum.currentValue);
            formData.set('goodsPic',document.querySelector('.el-upload__input').files[0]);
            this.$ajax.post('/addGoods',formData)
                .then(data=>{
                    if(data.ok===1){
                        this.$message({
                            message: data.msg,
                            type: 'success'
                        });
                        this.$emit('update:goodsVisible',false);
                        this.$router.push('/goodsManage');
                    }                    
                })
        },
        getShopList(){
            this.$ajax.get('/getShop')
                .then(data=>{
                    this.shopList=data.shopList
                })
        },
        getGoodsTypeList(id){
            this.$ajax.get('/getGoodsType',{
                params:{
                    shopId:id
                }
            })
                .then(data=>{
                    this.goodsTypeList=data.goodsTypeList
                })
        }
    },
    mounted(){
        if(this.id){
            this.shopId=this.id
        }
        if(this.typeId){
            this.goodsTypeId=this.typeId
        }
        this.getGoodsTypeList(this.shopId)
        this.getShopList()
    }
}
</script>

<style scoped>
    .el-input{
        width: 150px;
    }
</style>