<template>
    <div>
        <div class="car-wrap" @click="fn">
            <div class="car-list" v-show="isShow">
                <ul>
                    <li v-for="item in car">
                        <span>{{item.goodsName[0].goodsName}}</span>
                        <span>单价：{{item.price | currency}}</span>
                        <span>数量：{{item.buyNum}}</span>
                    </li>
                </ul>
            </div>
            <span class="totalPrice">{{total | currency}}</span>
            <button @click="buy">提交订单</button>
        </div>
    </div>
</template>

<script>
export default {
    name:'car',
    props:["carList"],
    data(){
        return {
            car:[],
            isShow:false,
            total:0
        }
    },
    methods:{
        fn(){
            this.isShow=!this.isShow;
        },
        totalPrice(){
            for(var i in this.car){
                this.total+=this.car[i].buyNum*this.car[i].price;
            }
            return this.total
        },
        buy(){
            var list = {};
            // order.phoneId = this.car[0].phoneId;
            // order.shopId = this.car[0].shopId;
            // order.total = this.total;
            for(var i in this.car){
                var obj = {}
                obj.buyNum=this.car[i].buyNum;
                obj.goodsId=this.car[i].goodsId;
                obj.total = this.car[i].buyNum*this.car[i].price
                list[i]=obj
            }
            console.log(this.car.length)
            this.$ajax.post('/buy',{
                phoneId:this.car[0].phoneId,
                shopId:this.car[0].shopId,
                total:this.total,
                goodsNum:this.car.length,
                list
            })
                .then(data=>{
                    if(data.ok===1){
                        this.$router.push('/Orders')
                    }
                })
        }
    },
    mounted(){
        this.car = this.carList;
        this.totalPrice()
        console.log(this.carList)
    }
}
</script>

<style scoped>
    .car-wrap{
        width: 100%;
        height: 15vw;
        border-top: 1px solid #ddd;
        box-sizing: border-box;
        background-color: #fff;
        position: fixed;
        bottom: 0;
        left: 0;
    }
    .car-list{
        width: 100%;
        position: fixed;
        bottom: 15vw;
        left: 0;
        font-size: 0.14rem;
        color: #333;
        background-color: #fff;
    }
    .car-list li{
        display: flex;
        justify-content: space-around;
    }
    button{
        width: 30vw;
        height: 100%;
        background-color: #38ca73;
        color: #fff;
        border: none;
        float: right;
    }
    .totalPrice{
        font-size: 0.16rem;
        font-weight: bold;
        color: #ff5339;
        line-height: 15vw;
        margin-left: 10vw;
    }
</style>