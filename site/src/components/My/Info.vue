<template>
    <div>
        <div class="infoBox" @click="goIn">
            <div class="logo">
                <img src="../../../static/images/logo.png" alt="">
            </div>
            <div class="info">
                <p>{{userInfo.length!=0?userInfo[0].phoneId:"登录/注册"}}</p>
                <p><i class="iconfont icon-shouji"></i>{{userInfo.length!=0?userInfo[0].phoneId:"登录后享受更多特权"}}</p>
            </div>
            <div class="arrow" >></div>
        </div>
        <div class="assets">
            <div>
                <p>
                    <span><i class="iconfont icon-renminbi"></i></span>
                </p>
                <p>钱包</p>
            </div>
            <div>
                <p>
                    <span><i class="iconfont icon-qianghongbao"></i></span>
                </p>
                <p>红包</p>
            </div>
            <div>
                <p>
                    <span><i class="iconfont icon-jinbi"></i></span>
                </p>
                <p>{{userInfo.length!=0?userInfo[0].goldNum:"金币"}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'info',
    data(){
        return {
            userInfo:[]
        }
    },
    methods:{
        goIn(){
            this.$router.push('/Login')
        }
    },
    mounted(){
        if(localStorage.userInfo){            
            this.userInfo = JSON.parse(localStorage.userInfo)
            this.$ajax.get('/getUserInfo',{
                params:{
                    phoneId:this.userInfo.phoneId
                }
            }).then(data=>{
                this.userInfo=data.userInfo
                console.log(this.userInfo)
            })
        }
    }
}
</script>

<style scoped>
    .mint-header{
        height: 11.73vw;
        font-size: 0.19rem;
    }
    .infoBox{
        padding: 6.666667vw 4vw;
        color: #fff;
        background-color: #0af;
    }
    .infoBox::after{
        display: block;
        content: '';
        clear: both;
        overflow: hidden;
    }
    .logo{
        float: left;
        width: 0.58rem;
        height: 0.58rem;
    }
    .logo img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .info{
        float: left;
        margin-left: .27rem;
    }
    .info p:nth-of-type(1){
        margin-bottom: 2.133vw;
        font-weight: bold;
        font-size: .19rem;
    }
    .arrow{
        float: right;
        line-height: 0.58rem;
        font-size: .24rem;
        font-weight: bold;
    }
    .assets{
        width: 100%;
        height: 22.4vw;
        background-color: #fff;
        display: flex;
        justify-content: flex-start;
    }
    .assets div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 33.33vw;
        height: 100%;
    }
    .assets{
        border-bottom: 1px solid #ddd;
    }
    .assets div:nth-of-type(n+1){
        border-left: 1px solid #ddd;
    }
    .assets div p:nth-of-type(1){
        margin-bottom: 1.33vw;
    }
    .assets p span{
        display: block;
        width: 6.93vw;
        height: 6.93vw;
        line-height: 6.93vw;
        color: #fff;
        border-radius: 50%;
        background-color: #f90;
    }
    .assets div:nth-of-type(2) span{
        background-color: #ff5f3e;
    }
    .assets div:nth-of-type(3) span{
        background-color: #6ac20b;
    }
</style>