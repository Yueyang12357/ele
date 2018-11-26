<template>
    <div>
        <el-dialog :title="shopId?'添加商品':'修改商品'" :visible="goodsVisible" @update:visible="v=>$emit('update:goodsVisible',false)">
            <el-form>
                <el-form-item label="商品名称" label-width="120px">
                    <el-input ref="goodsName" autocomplete="off" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item label="店铺名称" label-width="120px">
                    <el-select placeholder="请选择" v-model="shopId" >
                        <el-option v-for="item in shopList" :label="item.shopName" :value="item._id" :key="item._id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品类别" label-width="120px">
                    <el-select placeholder="请选择" v-model="goodsTypeId" >
                        <el-option v-for="item in goodsTypeList" :label="item.goodsTypeName" :value="item._id" :key="item._id"></el-option>
                    </el-select>
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
    props:["goodsVisible","shopId"],
    data(){
        return {

        }
    },
    methods:{

    },
    mounted(){

    }
}
</script>

<style scoped>
    
</style>