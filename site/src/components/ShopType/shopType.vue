<template>
    <div>
        <mt-header title="商铺分类">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div>
            <ul>
                <li v-for="i in shopList"  class="shop" @click="goShop(i._id)">
                    <div class="shopInfoBox">
                        <div class="imgBox">
                            <img :src="i.shopPic | imgUrl" alt="">
                        </div>
                        <div class="shopInfo">
                            <h3>{{i.shopName}}</h3>
                            <p><span class="star"></span><span>4.8</span><span>月售1246单</span></p>
                            <p><span>¥20起送</span><span>|</span><span>远距离配送费¥1.5</span></p>
                        </div>
                    </div>
                    <div class="shopActivityBox">
                        <div>
                            <span>{{i.shopType}}</span>
                        </div>
                        <p><span>首</span><span>新用户下单立减17元</span></p>
                        <p><span>减</span><span>满24减11，满69减25，满199减68，满499减150</span></p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name:'shop-type',
    data(){
        return {
            shopTypeName:'',
            shopList:[]
        }
    },
    methods:{
        getShopList(){
            this.$ajax.get('/getShopList',{
                params:{
                    shopTypeName:this.shopTypeName
                }
            })
                .then(data=>{
                    this.shopList= data.shopList
                    console.log(this.shopList,this.shopList[1].shopPic)
                })
        },
        goShop(id){
            this.$router.push({path:'/Shop',query:{shopId:id}})
        }
    },
    beforeMount(){
        this.shopTypeName = this.$route.query.shopTypeName;
        this.getShopList()

    }
}
</script>

<style scoped>
    .shop{
        padding: 4vw 0;
        border-bottom: 1px solid #eee;
        color: #666;
    }
    .shopInfoBox::after{
        content: '';
        display: block;
        clear: both;
        overflow: hidden;
    }
    .imgBox{
        float: left;
        width: 17.33vw;
        height: 17.33vw;
        padding: 0 2.67vw;
    }
    .imgBox img{
        width: 100%;
        height: 100%;
        border-radius: .5vw;
        border: 1px solid rgba(0,0,0,.08);
        box-sizing: border-box;
    }
    .shopInfo{
        float: left;
        line-height: 6.5vw;
    }
    .shopInfo h3{
        font-size: 0.14rem;
        color: #000;
    }
    .shopInfo p span{
        margin-right: 1.07vw;
        font-size: 0.1rem;
    }
    .star{
        display: inline-block;
        height: 0.1rem;
        width: 0.53rem;
        background-image: url("../../../static/images/star.png");
        background-size: cover;
    }
    .shopActivityBox{
        padding-left: 22.67vw;
        
    }
    .shopActivityBox div{
        margin-bottom: 2vw;
    }
    .shopActivityBox div span{
        font-size: 0.08rem;
        display: inline-block;
        padding: 0 2.12vw;
        border: 1px solid #ddd;
        border-radius: 1vw;
    }
    .shopActivityBox p{
        font-size: 0.08rem;
        line-height: 4.8vw;
        margin-top: 0.67vw;
        width: 60vw;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .shopActivityBox p span:nth-of-type(1){
        display: inline-block;
        background-color: #70BC46;
        border-radius: 0.5vw;
        line-height: 1;
        color: #fff;
        padding: 0.5vw;
    }
    .shopActivityBox p:nth-of-type(2) span:nth-of-type(1){
        background-color: #f07373;
        
    }
</style>