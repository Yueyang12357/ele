<template>
    <div>
        <div id="activity-adv">
            <div class="activity-adv">
                <h3>品质套餐</h3>
                <p>搭配齐全吃得好</p>
                <p><a href="javascript:;">立即抢购 ></a></p>
                <img :src="advList[0].advPic|imgUrl" alt="">
            </div>
            <div class="activity-adv">
                <h3>限量抢购</h3>
                <p>超值美味 9.9元起</p>
                <p><a href="javascript:;"><span>142人</span>正在抢 ></a></p>
                <img :src="advList[1].advPic|imgUrl" alt="">                
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    name:'activity-adv',
    data(){
        return {
            advList:[]
        }
    },
    methods:{

    },
    mounted(){
        this.$ajax.get('/getAdv',{
            params:{
                advTypeId:2
            }
        })
            .then(data=>{
                this.advList=data.advList
            })
    }
}
</script>

<style scoped>
    #activity-adv{
        margin-left: 2vw;
        margin-bottom: 0.8vw;
        overflow: hidden;
    }
    #activity-adv::after{
        content: '';
        display: block;
        clear: both;
        overflow: hidden;
    }
    .activity-adv{
        width: 43.5vw;
        height: 37.3vw;
        margin-right: 1vw;
        padding: 3.2vw 0 0 4vw;
        background-color: #f4f4f4 ;
        float: left;
        position: relative;
    }
    .activity-adv h3{
        font-size: 0.16rem;
        margin-bottom: 1.3vw;
        color: #333;
    }
    .activity-adv p{
        color: #777;
        margin-bottom: 2.4vw;
    }
    .activity-adv a{
        font-weight: bold;
    }
    .activity-adv:nth-of-type(1) a{
        color: #af8260;
    }
    .activity-adv:nth-of-type(2) h3{
        color: #e81919;
    }
    .activity-adv:nth-of-type(2) a{
        color: #333;
    }
    .activity-adv:nth-of-type(2) a span{
        color: #e81919;
    }
    .activity-adv img{
        width: 32vw;
        height: 21.3vw;
        position: absolute;
        bottom: -2vw;
        right: 0;
    }
</style>