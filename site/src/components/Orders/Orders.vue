<template>
    <div>
        <mt-header title="订单">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <ul>
            <li v-for="item in ordersList">
                <p>店铺ID：{{item.shopId}}</p>
                <p><span>商品种类：{{item.goodsNum}}</span><span>总价：{{item.total}}</span></p>
                <p>订单时间：{{item.createTime | date}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:'orders',
    data(){
        return {
            ordersList:{},
            phoneId:''
        }
    },
    mounted(){
        this.phoneId = JSON.parse(localStorage.userInfo).phoneId
        if(this.phoneId){
            this.$ajax.get('/getOrders',{
                params:{
                    phoneId:this.phoneId
                }
            }).then(data=>{
                this.ordersList = data.ordersList;
                console.log(this.ordersList)
            })
        }
        
    }
}
</script>

<style scoped>
    ul{
        margin-top: 5vw;
    }
    li{
        margin-bottom: 5vw;
        line-height: 1.5;
        font-size: 0.16rem;
        border-bottom: 1px solid #999;
        padding: 0 5vw;
        box-sizing: border-box;
    }
    li p{
        width: 100%;
        border-top: 1px solid #ddd;
    }
    li p:nth-of-type(2) span:nth-child(2){
        float: right;
    }
</style>