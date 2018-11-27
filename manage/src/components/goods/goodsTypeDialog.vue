<template>
    <div>
        <el-dialog title="添加商品类别" :visible="goodsTypeVisible" @update:visible="v=>$emit('update:goodsTypeVisible',false)">
            <el-form>
                <el-form-item label="商品类别名称" label-width="120px">
                    <el-input ref="goodsTypeName" autocomplete="off" placeholder="请输入商铺类别"></el-input>
                </el-form-item>
                <el-form-item label="选择店铺" label-width="120px">
                    <el-select placeholder="请选择" v-model="shopId" >
                        <el-option v-for="item in shopList" :label="item.shopName" :value="item._id" :key="item._id"></el-option>
                    </el-select>
                </el-form-item>           
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="$emit('update:goodsTypeVisible',false)">取 消</el-button>
                <el-button type="primary" class="submit-btn" @click="addGoodsType">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:'goods-type-dialog',
    props:["goodsTypeVisible","id"],
    data(){
        return {
            shopList:[],
            shopId:''
        }
    },
    methods:{
        addGoodsType(){
            this.$ajax.post('/addGoodsType',{
                goodsTypeName:this.$refs.goodsTypeName.currentValue,
                shopId:this.shopId
            })
                .then(data=>{
                    if(data.ok===1){
                        this.$message({
                            message: data.msg,
                            type: 'success'
                        });
                        this.getShopList(1);
                        this.$emit('update:goodsTypeVisible',false);
                        this.$router.push('/goodsTypeManage');
                    }
                })
        },
        getShopList(){
            this.$ajax.get('/getShop')
                .then(data=>{
                    this.shopList=data.shopList
                })
        }
    },
    mounted(){
        this.getShopList();
        if(this.id){
            this.shopId=this.id;
        }
    }
}
</script>

<style scoped>
    .el-input{
        width: 150px;
    }
</style>