<template>
    <div>
        <mt-swipe :auto="0">
            <mt-swipe-item v-for="item in shopTypeList" :key="item._id">
                <div class="shopType">
                    <div class="type" v-for="type in item" @click="goShopType(type.shopTypeName)">
                        <img :src="type.shopTypePic | imgUrl" alt="">
                        <p>{{type.shopTypeName}}</p>
                    </div>
                </div>                
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    name:'shop-type',
    data(){
        return {
            shopTypeList:[]
        }
    },
    methods:{
        goShopType(name){
            this.$router.push('/ShopType/shopName='+name)
        }
    },
    mounted(){
        this.$ajax.get('/shopType')
            .then(data=>{
                this.shopTypeList=data.shopTypeList
            })
    }
}
</script>

<style scoped>
    .mint-swipe{
        margin-top: 3vw;
        width: 100%;
        height: 47.2vw;
        color: #666;
        
    }
    .shopType{
        display: flex;
        flex-wrap: wrap;
    }
    .type{
        text-align: center;
        width: 20vw;
        height: 23.6vw;
    }
    .type img{
        width: 12vw;
        height: 12vw;
    }
</style>