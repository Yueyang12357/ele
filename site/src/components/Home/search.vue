<template>
    <div>
        <div class="search">
            <p @click="openSearch"><i class="iconfont icon-sousuo"></i>搜索饿了么商家、商品名称</p>
        </div>
    </div>
</template>

<script>
export default {
    name:'search',
    data(){
        return {
            
        }
    },
    methods:{
        openSearch(){
            this.$router.push('/Search')
        }
    }
}
</script>

<style scoped>
    .search{
        width: 100%;
        height: 13.6vw;
        border-width: 2vw 3.73vw 2vw 3.73vw;
        border-style: solid;
        border-color: #0af;
        box-sizing: border-box;
        line-height: 9.6vw;
        text-align: center;
        color: #999;
        font-size: 0.14rem;
    }
</style>