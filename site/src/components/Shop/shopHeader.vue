<template>
    <div>
        <div class="title">
            <mt-header title="">
                <router-link to="/" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
            </mt-header>
        </div>
        <div class="header">
            <div class="shopBg">
                <img :src="shopInfo.shopPic | imgUrl" alt="">
            </div>
            <div class="shopLogo">
                <img :src="shopInfo.shopPic | imgUrl" alt="">
            </div>
        </div>
        <h2>{{shopInfo.shopName}}</h2>
        <p class="info"><span>评价4.8</span><span>月售4388单</span><span>蜂鸟快送约48分钟</span></p>
        <p class="activity"><span>首单</span>新用户下单立减17元(不与其它活动同享)</p>
    </div>
</template>

<script>
export default {
    name:'shop-header',
    props:["shopId"],
    data(){
        return {
            shopInfo:{
                shopPic: "1543565883816.png"
            }
        }
    },
    methods:{
        getShopInfo(){
            this.$ajax.get('/getShopInfo',{
                params:{
                    shopId:this.shopId
                }
            }).then(data=>{
                this.shopInfo=data.shopInfo;
            })
        }        
    },
    mounted(){
        this.getShopInfo()
    }
}
</script>

<style scoped>
    .title{
        z-index: 5;
        position: absolute;
        top: 0;
        left: 0;
    }
    .mint-header{
        background-color: rgba(255,255,255,0);
    }
    .header{
        height: 27.72vw;
        width: 100%;
        position: relative;
    }
    .shopBg{
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
    .shopBg img{
        width: 100%;
    }
    .shopLogo{
        width: 20vw;
        height: 20vw;
        position: absolute;
        bottom: -4vw;
        left: 0;
        right: 0;
        margin: auto;
    }
    .shopLogo img{
        width: 100%;
        height: 100%;
        border-radius: 3vw;
    }
    h2{
        margin-top: 7vw;
        text-align: center;
        font-size: 0.20rem;
        font-weight: bold;
        color: #333;
    }
    .info,.activity{
        text-align: center;
        line-height: .20rem;
        color: #666;
        font-size: 0.01rem;
    }
    .info span{
        margin-right: .1rem;
    }
    .activity{
        color: #333;
        margin-bottom: 0.2rem;
    }
    .activity span{
        display: inline-block;
        line-height: 1.2;
        color: #fff;
        background-color: #70BC46;
        margin-right: 0.1rem;
    }
</style>