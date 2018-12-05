<template>
    <div>
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for="item in bannerList" :key="item._id">
                <div class="bannerImg">
                    <img :src="item.advPic | imgUrl" alt="">
                </div>                
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    name:'banner',
    data(){
        return {
            bannerList:[]
        }
    },
    beforeMount(){
        this.$ajax.get('/getAdv',{
            params:{
                advTypeId:1
            }
        })
            .then(data=>{
                this.bannerList=data.advList;
            })
    }
}
</script>

<style scoped>
    .mint-swipe{
        width: 100%;
        height: 23.47vw;        
    }
    .bannerImg img{
        width: 100%;
        height: 23.47vw;
    }
</style>